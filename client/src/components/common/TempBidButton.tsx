import React from 'react'
import { Button, Image } from '@chakra-ui/react';
import logoBlue from './assets/logo-blue.svg';

const BidButton = () => {
    return (
        <Button bg='brand.tezos' height='100px' width='100px' borderRadius='50%' boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)' _hover={{ bg: 'rgb(44, 125, 247,0.5)' }}>
            <Image src={logoBlue} />
        </Button>
    )
}

export default BidButton
