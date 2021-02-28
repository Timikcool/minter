import React from 'react'
import { Flex, Box, Text, Image } from '@chakra-ui/react';
import about from './assets/about us-02.svg';

export const CatalogAbout = () => {
    return (
        <Flex w="100%"
            mt={10}
            flex="1"
            borderLeftWidth="1px"
            borderLeftColor="brand.lightBlue"
            flexDirection='column'
        >
            <Text px='10' as='h2' fontWeight='bold' fontSize='36px' my='10' textAlign='center'>How NFT Button works</Text>
            <Image src={about} objectFit="cover" height='400px'/>
            <Text px='10' my='4' fontSize='16px' maxWidth='1400px' alignSelf='center' >
            It's easy-peasy. Bob creates an auction for an NFT. He sets a bid price at 10 tez and a countdown timer at 10:00 hours.<br/><br/>

Carol presses the button and submits the bid of 10 tez. She becomes the leader and resets the countdown timer to 7:30 hours. Ted, Alice, and their comrades join the biding and thus reset the countdown again.<br/><br/>

So that with yet another bid the countdown timer is reset to a shorter time. In the end, time is running out so fast hence nobody is in time to click the button. Finally, Bob receives his pot and the current leader takes his NFT and share of a pot home. Profit! 
             </Text>
        </Flex>
    )
}
