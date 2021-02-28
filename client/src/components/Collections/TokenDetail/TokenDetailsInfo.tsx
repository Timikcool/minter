import React from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import BidButton from '../../common/TempBidButton';

const TokenDetailsInfo = ({
    colletionImg,
    lotName,
    inititalTime,
    selletName,
    sellersSharePot,
    winnersSharePot,
    minimumBidNumber,
    bigAmount
}) => (
    <Flex height='800px' bg='#FAF089' width='100%' justifyContent='center'>
        <Flex maxWidth="1400px" px='4'>
            <Flex width='45%' flexDir='column' justifyContent='center'>
                <Box width='100%' height='350px'>
                    <Image src={colletionImg} width='100%' height='100%'></Image>
                </Box>
                <Text mt='2'>
                    It's easy-peasy! Bob creates an auction for an NFT. He sets a bid price at 10 tez and a countdown timer at 10:00 hours.
                    Carol presses the button and submits the bid of 10 tez. She becomes the leader and resets the countdown timer to 7:30 hours.
                    </Text>
            </Flex>
            <Flex justifyContent='center' alignItems='center' flex={1}>
                <Flex flexDirection='column' height='450px' justifyContent='space-between'>
                    <Text fontWeight='bold' fontSize='32px'>Lot name: {lotName}</Text>
                    <Box my="8">
                        <Text>
                            <Text fontWeight="bold" as="span">
                                Sellet Name:
                            </Text>{selletName}</Text>
                        <Text>
                            <Text fontWeight="bold" as="span">
                                Initial Timer:
                            </Text>{inititalTime}</Text>
                        <Text>
                            <Text fontWeight="bold" as="span">
                                Seller's Share of a Pot:
                            </Text>{sellersSharePot}</Text>
                        <Text>
                            <Text fontWeight="bold" as="span">
                                Winner's Share of a Pot:
                            </Text>{winnersSharePot}</Text>
                        <Text>
                            <Text fontWeight="bold" as="span">
                                Minimum Number of Bids:
                            </Text>{minimumBidNumber}</Text>
                        <Text>
                            <Text fontWeight="bold" as="span">
                                Bid Amount:
                            </Text>{bigAmount}</Text>
                    </Box>
                    <Text fontWeight='bold' fontSize='24px'>Pot size : tez</Text>
                    <Flex alignItems='flex-end'>
                        <BidButton />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
)

export default TokenDetailsInfo
