import React from 'react'
import { Box, Flex, Text, Image, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import BidButton from './TempBidButton';

const NFTList = ({ collections }) => {
    return (
        <Flex
            w="100%"
            px={10}
            py={6}
            flex="1"
            // bg="brand.brightGray"
            bg="brand.white"
            flexWrap='wrap'
            alignContent='flex-start'
            maxWidth="1900px"
            alignSelf='center'>
            {
                collections.map(({ potSize, time, img, inititalTime, winnersSharePot, bigAmount, lotName }) => (
                    <Flex
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p='6'
                        width="450px"
                        height='700px'
                        boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)'
                        transition='all 0.2s ease-out'
                        _hover={{
                            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
                        }}
                        flexDirection='column'
                        m={16}
                        pos='relative'
                        justifyContent='space-between'
                    >
                        <Image height="50%" width="100%" src={img} />
                        <Flex flexDir='column' flex={1}>
                            <Flex justifyContent='flex-end'>
                                <Text fontSize="24px" fontWeight='bold'>{time}</Text>
                            </Flex>
                            <Flex flexDir='column'my={6}>
                                <Text fontSize="24px" fontWeight='bold'>
                                    {lotName}
                                </Text>
                                <Text mt='4'>
                                    <Text fontWeight="bold" as="span">
                                        Initial Timer:</Text> {inititalTime}
                                </Text>

                                <Text>
                                    <Text fontWeight="bold" as="span">
                                        Winner's Share of a Pot: </Text>{winnersSharePot}%
                                    </Text>

                                <Text>
                                    <Text fontWeight="bold" as="span">
                                        Bid Amount:</Text> {bigAmount}</Text>
                            </Flex>
                            <Text fontSize="24px" fontWeight='bold'>Pot size: {potSize} trx</Text>
                            <Flex flex='1' justifyContent='flex-end' alignItems='center'>
                                <BidButton />
                            </Flex>
                        </Flex>

                    </Flex>
                ))
            }
        </Flex>
    )
}

export default NFTList


{/* <Box pos="absolute" top="20px" right="20px" bg="green.400" p='2' borderRadius='full'>
                            <Text color="white"><Text as="span">{balance}</Text> xtz</Text>
                        </Box>
                        <Box d="flex" alignItems="baseline" justifyContent='center'>
                            <Image
                                src={img}
                                alt="ntf asset"
                                borderRadius="50%"
                                width="80px"
                                height="80px" />
                        </Box>
                        <Box my='6'>
                            <Text as='h4' textAlign='center'>
                                {desription}
                            </Text>
                        </Box>
                        <Flex justifyContent='center' >
                            <Flex>
                                <CircularProgress value={40} color="green.400" size="120px">
                                    <CircularProgressLabel fontWeight="bold" fontSize="16px">
                                        {time}
                                    </CircularProgressLabel>
                                </CircularProgress>
                            </Flex>
                        </Flex> */}