import React from 'react'
import { Flex, Box, Text, Image, Button, Link } from '@chakra-ui/react';
import logoBlue from '../../common/assets/logo-blue.svg';

export const CatalogInfo = () => {
    return (
        <Box w="100%"
            px={10}
            mt={10}
            flex="1"
            borderLeftWidth="1px"
            borderLeftColor="brand.lightBlue">
            <Flex>
                <Box width="50%">
                    <Text as='h2' fontWeight='bold' fontSize='36px' my='10' textAlign='center'>Who we are</Text>

                    <Text fontSize='16px'>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
                        'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now
                        use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                        Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
                        'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now
                        use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                        Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </Text>
                    <Flex my='6'>
                        <Link bg='brand.telegram' p="2" width='40%' href="#" mr='4' color='white' lineHeight='40px' borderRadius='10px' textAlign='center' verticalAlign='middle'>
                            Join us on Telegram
                        </Link>
                        <Link bg='brand.tezos' p='2' width='40%' href="#"  color='white' lineHeight='40px' borderRadius='10px'  textAlign='center' verticalAlign='middle'>
                            Join Tezos
                        </Link>
                    </Flex>
                </Box>
                <Flex width="50%" justifyContent='center' alignItems='center'>
                    <Image src={logoBlue} bg="brand.tezos" width='200px' height='200px' borderRadius='50%' />
                </Flex>
            </Flex>


        </Box>
    )
}
