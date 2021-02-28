import React, { useEffect } from 'react';
import { Switch, Route } from 'wouter';
import SplashPage from '../SplashPage';
import CreateNonFungiblePage from '../CreateNonFungiblePage';
import CollectionsCatalog from '../Collections/Catalog';
import CollectionsTokenDetail from '../Collections/TokenDetail';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Flex } from '@chakra-ui/react';
import Notifications from '../common/Notifications';
import { useSelector, useDispatch } from '../../reducer';
import { reconnectWallet } from '../../reducer/async/wallet';
import Routes from '../../routes'
export default function App() {
  const dispatch = useDispatch();
  const walletReconnectAttempted = useSelector(
    s => s.system.walletReconnectAttempted
  );

  useEffect(() => {
    if (!walletReconnectAttempted) {
      dispatch(reconnectWallet());
    }
  }, [walletReconnectAttempted, dispatch]);

  if (!walletReconnectAttempted) {
    return null;
  }

  return (
    <Flex pos="absolute" w="100%">
      <Flex justifyContent="space-between" width="100%" flexDir="column" a>
        <Header />
        <Routes/>
        <Footer/>
        <Notifications />
      </Flex>
    </Flex>
  );
}
