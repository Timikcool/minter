import React from 'react'
import { Flex, Box, Text, Image, Button } from '@chakra-ui/react';
import BidButton from '../../common/TempBidButton';

export const CatalogFeatures = ({ pot, lotName, time, initialTime, potShare, bid }) => {
    return (
        <Box
            d='flex'
            justifyContent='space-around'
            height='88vh'
            width="100%"
            alignItems="center"
            backgroundImage={'url(/static/media/main_page-01.f1f053cc.svg)'}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize='cover'>
            <Flex borderRadius="50%" justify='center' align='center' width="50%">
            
            </Flex>
            <Flex
                width="35%"
                minWidth='500px'
                boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)'
                p='6'
                justifyContent='space-between'
                bg='brand.white'
                pos='relative'
                height='450px'
                borderRadius='5px'>
                <Flex flexDirection='column' width='50%'>
                    <Text mb='4' mt='8' fontSize="16px">Featured Auction</Text>
                    <Flex justifyContent='space-between'>
                        <Box>
                            <Text py='2'><Text fontWeight="bold" as='span' fontSize='24px'>Lot name:</Text> {lotName}</Text>
                            <Text><Text fontWeight="bold" as='span'>Initital Timer:</Text> {initialTime}</Text>
                            <Text><Text fontWeight="bold" as='span'>Winner's Share of a Pot</Text> {potShare}%</Text>
                            <Text><Text fontWeight="bold" as='span'>Bid Amoute:</Text> {bid}</Text>
                        </Box>
                    </Flex>
                    <Flex justify='space-between' my='2'>
                        <Box d='flex' alignItems='center' width='50%' >
                            <Text fontSize="24px" fontWeight="bold" mt='2' whiteSpace='nowrap'><Text as='span'>Pot Size:</Text> {pot} tez</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Flex flexDirection='column' mr='2' alignItems='center' alignSelf='flex-end'>
                    <BidButton/>
                    <Text mt="2" fontWeight="bold">Press to Bid Now</Text>
                </Flex>

                <Box d='flex' alignItems='center' fontWeight="bold" justifyContent='flex-end' width='50%' pos='absolute' top='24px' right='24px'>
                    <Text fontSize="24px">
                        {time}
                    </Text>
                </Box>
            </Flex>
        </Box >
    )
}
