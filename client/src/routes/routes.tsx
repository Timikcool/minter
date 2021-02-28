import React from 'react'
import SplashPage from '../components/SplashPage';
import CreateNonFungiblePage from '../components/CreateNonFungiblePage';
import CollectionsCatalog from '../components/Collections/Catalog';
import CollectionsTokenDetail from '../components/Collections/TokenDetail';

const routes = [
    {
        path: "/",
        component: () => SplashPage,
        isPrivate: false,
    },
    {
        path: "/create",
        component: () => CreateNonFungiblePage,
        isPrivate: true,
    },
    {
        path: "/collections",
        component: () => CollectionsCatalog,
        isPrivate: true,
    },
    {
        path: "/collection/:contractAddress/token/:tokenId",
        component: () => CollectionsTokenDetail,
        isPrivate: true,
    },
    ]
    
    export default routes;