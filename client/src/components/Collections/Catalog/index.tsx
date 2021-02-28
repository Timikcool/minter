import React, { useEffect, useState } from 'react';
import { Flex, Box, Container, Skeleton } from '@chakra-ui/react';
import { useLocation } from 'wouter';
// import { RefreshCw } from 'react-feather';
import { MinterButton } from '../../common';
// import Sidebar from './Sidebar';
// import TokenGrid from './TokenGrid';
import headerLogo from '../../common/assets/logo.svg';
import NFTList from '../../common/NFTList'
import { CatalogAbout } from './CatalogAbout'
import { CatalogFeatures } from './CatalogFeatures'
import { CatalogInfo } from './CatalogInfo'


import { useSelector, useDispatch } from '../../../reducer';
import {
  getContractNftsQuery,
  getWalletAssetContractsQuery
} from '../../../reducer/async/queries';
import { selectCollection } from '../../../reducer/slices/collections';
import { getContractNfts } from '../../../lib/nfts/queries';
import selectObjectByKeys from '../../../lib/util/selectObjectByKeys';
import { isEmpty } from 'lodash';

export default function Catalog() {
  const [, setLocation] = useLocation();
  const { system, collections: state } = useSelector(s => s);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedCollection = state.selectedCollection;
    if (selectedCollection === null) {
      dispatch(selectCollection(state.globalCollection));
    } else {
      dispatch(getContractNftsQuery(selectedCollection));
    }
  }, [
    system.status,
    state.selectedCollection,
    state.globalCollection,
    dispatch
  ]);

  useEffect(() => {
    if (system.status !== 'WalletConnected') {
      setLocation('/', { replace: true });
    } else {
      dispatch(getWalletAssetContractsQuery());
    }
  }, [system.status, setLocation, dispatch]);


  const [auctions, setAuctions] = useState([]);
  const [allTokens, setTokens] = useState([]);
  const [currentAuction, setCurrentAuction] = useState({} as any);
  const [currentToken, setCurrentToken] = useState({} as any);
  const [loading, setLoading] = useState(false);

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

      setTokens(allTokens);
      setAuctions(auctions);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {

    const init = async () => {
      setLoading(true);
      await fetchAuctionsWithTokens();
      const auction = auctions[0];
      const tokenMetadata = allTokens.find(({ id }) => `${id}` === auction?.token?.[1]?.value) as any;
      setCurrentAuction(auction);
      setCurrentToken(tokenMetadata);
      setLoading(false);
    }

    init()

    const intervalId = setInterval(fetchAuctionsWithTokens, 30000);

    return () => clearInterval(intervalId);
  }, [])




  const feature = { pot: 300, lotName: 'Lot name', time: '00:23:32', initialTime: '19:23:32', potShare: 20, bid: 0.4 }

  return (
    <Flex flexDir='column' alignItems='center'>
      {
        (loading || isEmpty(currentAuction)) ? <Skeleton /> : <CatalogFeatures auction={currentAuction}
          pot={currentAuction.bank / 1000000}
          lotName={currentAuction.name}
          time={currentAuction.closes_at}
          initialTime={currentAuction.opens_at}
          potShare={currentAuction.leader_percent}
          bid={currentAuction.bid_size / 1000000} />

      }
      <NFTList auctions={auctions} tokensMetadata={allTokens} />
      <CatalogAbout />
      <CatalogInfo />
    </Flex>
    // <Box>
    //   <CatalogFeatures pot={feature.pot} lotName={feature.lotName} time={feature.time} initialTime={feature.initialTime} potShare={feature.potShare} bid={feature.bid} />
    //   <CatalogItems auctions={auctions} tokensMetadata={allTokens} />
    //   <CatalogAbout />
    //   <CatalogInfo />
    // </Box>
  );
}
