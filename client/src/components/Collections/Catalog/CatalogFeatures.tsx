import React from 'react'
import { Flex, Box, Text, Image, Button } from '@chakra-ui/react';
import logo from '../../common/assets/logo.svg';
import logoBlue from '../../common/assets/logo-blue.svg';


export const CatalogFeatures = ({ pot, lotName, time, initialTime, potShare, bid }) => {
    return (
        <Box d='flex' justifyContent='space-around' height='400px' alignItems="center">
            <Flex borderRadius="50%" justify='center' align='center' width="50%">
                <Image
                    src={logo}
                    alt="ntf asset"
                    width="120px"
                    height="120px"
                />
            </Flex>
            <Flex width="35%" boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)' borderRadius="lg" px='6' flexDirection='column' justifyContent='space-between'>
                <Text fontWeight="bold" textAlign="center" p='2' fontSize="24px">Featured Auction</Text>
                <Flex justify='space-between' my='2'>
                    <Box d='flex' alignItems='center' width='50%'>
                        <Text fontSize="22px"><Text fontWeight="bold" as='span'>Pot Size:</Text> {pot} tez</Text>
                    </Box>
                    <Box d='flex' alignItems='center' justifyContent='flex-end' width='50%'>
                        <Text fontSize="36px">
                            {time}
                        </Text>
                    </Box>
                </Flex>
                <Flex justifyContent='space-between'>
                    <Box>
                        <Text><Text fontWeight="bold" as='span'>Lot name:</Text> {lotName}</Text>
                        <Text><Text fontWeight="bold" as='span'>Initital Timer:</Text> {initialTime}</Text>
                        <Text><Text fontWeight="bold" as='span'>Winner's Share of a Pot</Text> {potShare}%</Text>
                        <Text><Text fontWeight="bold" as='span'>Bid Amoute:</Text> {bid}</Text>
                    </Box>
                    <Flex flexDirection='column' mr='2' alignItems='center'>
                        <Button bg='brand.tezos' height='100px' width='100px' borderRadius='50%' boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)' _hover={{ bg: 'rgb(44, 125, 247,0.5)' }}>
                            <Image src={logoBlue} />
                        </Button>
                        <Text mt="2" fontWeight="bold">Press to Bid Now</Text>
                    </Flex>
                </Flex>
                <Flex mb='5'>
                    <Button fontWeight="bold" p='2' color='white' bg='green.400' _hover={{ bg: 'green.200' }} >More Details</Button>
                </Flex>
            </Flex>
        </Box >
    )
}
