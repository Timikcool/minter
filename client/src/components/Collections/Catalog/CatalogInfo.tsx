import React from 'react'
import { Flex, Box, Text, Image, Button, Link } from '@chakra-ui/react';
import howDoesItWorks from './assets/how_does_it_works.svg';

export const CatalogInfo = () => {
    return (
        <Flex w="100%"
            px={10}
            mt={10}
            flex="1"
            borderLeftWidth="1px"
            borderLeftColor="brand.lightBlue"
            flexDir='column'
            alignItems='center'>
            <Text as='h2' fontWeight='bold' fontSize='36px' my='10' textAlign='center'>Who we are</Text>
            <Flex maxWidth='1400px' px='10' >
                <Box width="50%" >
                    <Text fontSize='16px' pr='200px'>
                        We are the Buttonists, a team from #TezosDeFiHackathon. In a few days, we created NFT Button which is a general-purspose marketplace with an auction-lottery hybrid mechanism.<br /><br />

                        Our goal is to overcome 3 obstacles on Tezos:
                        1. NFT marketplaces are not fully developed.
                        2. It’s usually difficult for an end user to mint NFT.
                        3. There is a lack of special features on traditional NFT marketplaces.<br /><br />

                        NFT Button will be useful to artists, NFT collectors, celebs, and charities that are looking for new markets. We will also appreciate any new use cases as NFT Button is still quite an experiment.<br /><br />

                        Thanks guys from tzbutton, OpenMinter, and the entire Tezos ecosystem for an inspiration. :)
                    </Text>
                    <Flex my='6'>
                        <Link bg='brand.telegram' p="2" width='40%' href="#" mr='4' color='white' lineHeight='40px' borderRadius='10px' textAlign='center' verticalAlign='middle'>
                            Join us on Telegram
                        </Link>
                        <Link bg='brand.tezos' p='2' width='40%' href="#" color='white' lineHeight='40px' borderRadius='10px' textAlign='center' verticalAlign='middle'>
                            Join Tezos
                        </Link>
                    </Flex>
                </Box>
                <Flex width="50%" justifyContent='center' alignItems='center'
                    bg='#FCF6B8'
                >
                    <Image src={howDoesItWorks} />
                </Flex>
            </Flex>


        </Flex>
    )
}
