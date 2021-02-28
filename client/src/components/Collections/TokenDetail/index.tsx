import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { AspectRatio, Box, Code, Flex, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import {
  ChevronLeft,
  HelpCircle,
  /* MoreHorizontal, */ Star
} from 'react-feather';
import { MinterButton } from '../../common';
import { TransferTokenButton } from '../../common/TransferToken';
import { ipfsUriToGatewayUrl, uriToCid } from '../../../lib/util/ipfs';
import { useSelector, useDispatch } from '../../../reducer';
import {
  getContractNftsQuery,
  getNftAssetContractQuery
} from '../../../reducer/async/queries';
import TokenDetailsInfo from './TokenDetailsInfo'
import NFTList from '../../common/NFTList'
import selectObjectByKeys from '../../../lib/util/selectObjectByKeys';
import { getContractNfts } from '../../../lib/nfts/queries';
import { isEmpty } from 'lodash';
import { is } from 'immer/dist/internal';
// import headerLogo from './assets/logo.svg';

function NotFound() {
  return (
    <Flex flex="1" width="100%" justify="center">
      <Flex w="100%" flex="1" flexDir="column" align="center">
        <Flex
          px={32}
          py={16}
          bg="gray.100"
          textAlign="center"
          align="center"
          borderRadius="5px"
          flexDir="column"
          fontSize="xl"
          borderColor="gray.200"
          borderWidth="5px"
          mt={36}
          color="gray.300"
        >
          <HelpCircle size="100px" />
          <Heading size="xl" fontWeight="normal" pt={8} color="gray.400">
            Token not found
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}

function MediaNotFound() {
  return (
    <AspectRatio
      ratio={4 / 3}
      width="100%"
      borderRadius="3px"
      bg="gray.100"
      overflow="hidden"
    >
      <Flex flexDir="column" align="center" justify="center">
        <Box color="gray.300" pb={10}>
          <HelpCircle size="100px" />
        </Box>
        <Heading color="gray.300" size="xl">
          Image not found
        </Heading>
      </Flex>
    </AspectRatio>
  );
}

function TokenImage(props: { src: string }) {
  const [errored, setErrored] = useState(false);
  const [obj, setObj] = useState<{ url: string; type: string } | null>(null);
  useEffect(() => {
    (async () => {
      let blob;
      try {
        blob = await fetch(props.src).then(r => r.blob());
      } catch (e) {
        return setErrored(true);
      }
      setObj({
        url: URL.createObjectURL(blob),
        type: blob.type
      });
    })();
  }, [props.src]);

  if (errored) {
    return <MediaNotFound />;
  }
  if (!obj) return null;

  if (/^image\/.*/.test(obj.type)) {
    return (
      <Image
        src={props.src}
        objectFit="contain"
        flex="1"
        onError={() => setErrored(true)}
      />
    );
  }

  if (/^video\/.*/.test(obj.type)) {
    return (
      <video controls>
        <source src={obj.url} type={obj.type} />
      </video>
    );
  }

  return <MediaNotFound />;
}

interface TokenDetailProps {
  contractAddress: string;
  tokenId: number;
}

const TokenDetail = ({ params }) => {
  let { auctionId } = params;
  const [, setLocation] = useLocation();
  const { system, collections: state } = useSelector(s => s);
  const dispatch = useDispatch();


  const [auctions, setAuctions] = useState([]);
  const [allTokens, setTokens] = useState([]);
  const [currentAuction, setCurrentAuction] = useState({} as any);
  const [currentToken, setCurrentToken] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const fetchAuctionsWithTokens = async () => {

    try {
      const auctionStorage = await system.betterCallDev.getContractStorage(system.config.contracts.auction);
      const auctionsMapById = selectObjectByKeys(auctionStorage, {
        type: 'big_map',
        name: 'auctions'
      })?.value;

      const auctionsRaw = await system.betterCallDev.getBigMapKeys(auctionsMapById);
      const auctions = auctionsRaw.map(auction => {
        console.log(auction);

        const id = auction?.data.key?.value;
        const metadataMap = auction?.data?.value?.children;
        if (!metadataMap) return auction;
        const metadata = metadataMap.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value || curr?.children }), {});
        return { ...metadata, id }
      })
      const allTokens = await getContractNfts(system, system.config.contracts.nftFaucet);

      const auction = auctions.find(({ id }) => id === auctionId);
      const tokenMetadata = allTokens.find(({ id }) => `${id}` === auction?.token?.[1]?.value) as any;

      setCurrentAuction(auction);
      setCurrentToken(tokenMetadata)
      setTokens(allTokens);
      setAuctions(auctions.filter(({ id }) => id !== auctionId));
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {

    const init = async () => {
      setLoading(true);
      await fetchAuctionsWithTokens()
      setLoading(false);
    }

    init();

    const intervalId = setInterval(fetchAuctionsWithTokens, 30000);

    return () => clearInterval(intervalId);
  }, [])



  const collections = [{
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: ''
  },
  {
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: ''
  }, {
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: ''
  },
    , {
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: ''
  },
    , {
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: ''
  },]

  if (loading || isEmpty(currentAuction) || isEmpty(currentToken)) {
    return <Flex flex="1" width="100%" minHeight="0" flexDir='column'>
      <Skeleton />
    </Flex>
  }

  return (
    <Flex flex="1" width="100%" minHeight="0" flexDir='column'>
      <TokenDetailsInfo
        auction={currentAuction}
        colletionImg={ipfsUriToGatewayUrl(system.config.network, currentToken?.artifactUri)}
        lotName={currentAuction.name}
        inititalTime={currentAuction.opens_at}
        selletName={<Code>{currentAuction.owner}</Code>}
        sellersSharePot={100 - parseInt(currentAuction.leader_percent)}
        winnersSharePot={currentAuction.leader_percent}
        minimumBidNumber={currentAuction.min_bank / 1000000}
        bigAmount={currentAuction.bid_size / 1000000}
        potSize={currentAuction.bank}
      />

      <NFTList auctions={auctions} tokensMetadata={allTokens} />
    </Flex>
  );
}

export default TokenDetail;


