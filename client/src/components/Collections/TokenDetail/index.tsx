import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { AspectRatio, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
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

function TokenDetail({ contractAddress, tokenId }: TokenDetailProps) {
  const [, setLocation] = useLocation();
  const { system, collections: state } = useSelector(s => s);
  const dispatch = useDispatch();
  const collection = state.collections['KT1AWMwR6nNCLH3SWVUoqfkRLd9wXE7U9Q76'];

  const collectionUndefined = collection === undefined;

  useEffect(() => {
    if (collectionUndefined) {
      dispatch(getNftAssetContractQuery(contractAddress));
    } else {
      dispatch(getContractNftsQuery(contractAddress));
    }
  }, [contractAddress, tokenId, collectionUndefined, dispatch]);
  // if (!collection?.tokens) {
  //   return null;
  // }

  // const token = collection.tokens.find(token => token.id === tokenId);
  // if (!token) {
  //   return <NotFound />;
  // }
  


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
  return (
    <Flex flex="1" width="100%" minHeight="0" flexDir='column'>
      <TokenDetailsInfo
        colletionImg='#'
        lotName={'test lot name'}
        inititalTime={'19:30:14'}
        selletName={'test sellet name'}
        sellersSharePot={ '25'}
        winnersSharePot={ '75'}
        minimumBidNumber={ '100'}
        bigAmount={ '0.4'} />
        <NFTList collections={collections}/>
    </Flex>
  );
}

export default TokenDetail;


