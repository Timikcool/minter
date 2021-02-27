import React, { useEffect } from 'react';
import { Flex, Box, Container } from '@chakra-ui/react';
import { useLocation } from 'wouter';
// import { RefreshCw } from 'react-feather';
import { MinterButton } from '../../common';
// import Sidebar from './Sidebar';
// import TokenGrid from './TokenGrid';
import headerLogo from '../../common/assets/logo.svg';
import { CatalogItems } from './CatalogItems'
import { CatalogAbout } from './CatalogAbout'
import { CatalogFeatures } from './CatalogFeatures'
import { CatalogInfo } from './CatalogInfo'


import { useSelector, useDispatch } from '../../../reducer';
import {
  getContractNftsQuery,
  getWalletAssetContractsQuery
} from '../../../reducer/async/queries';
import { selectCollection } from '../../../reducer/slices/collections';

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

  // const selectedCollection = state.selectedCollection;
  // if (system.status !== 'WalletConnected' || !selectedCollection) {
  //   return null;
  // }

  // const collection = state.collections['selectedCollection'];

  const collections = [{
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: headerLogo
  },
  {
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: headerLogo
  }, {
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: headerLogo
  },
    , {
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: headerLogo
  },
    , {
    time: '00:34:31',
    desription: 'loren, ismup some test in description writen, loren, ismup some test in description writen loren, ismup some test in description writen',
    balance: '3434',
    img: headerLogo
  },]

  const feature = {pot: 300, lotName: 'Lot name', time: '00:23:32', initialTime: '19:23:32', potShare: 20, bid: 0.4}

  return (
    <Box>
      <CatalogFeatures pot={feature.pot} lotName={feature.lotName} time={feature.time} initialTime={feature.initialTime}  potShare={feature.potShare} bid={feature.bid}/>
      <CatalogItems collections={collections}/>
      <CatalogAbout />
      <CatalogInfo/>
    </Box>
  );
}
