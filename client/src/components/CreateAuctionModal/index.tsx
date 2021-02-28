import {
    Box,
    Button,
    Center,
    Flex, FormControl,
    FormLabel,
    Input,
    Link, Modal,
    ModalBody,
    ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay,
    NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField,
    NumberInputStepper, Select,
    SimpleGrid,
    Slider,
    SliderFilledTrack,
    SliderThumb, SliderTrack, Text,
    Textarea,
    useDisclosure,
    useToast,
    Spinner,
    Heading
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from 'react';
import { useLocation } from "wouter";
import { useSelector } from '../../reducer';
import DatePicker from '../common/DatePicker';
import addHours from 'date-fns/addHours';
import { MichelsonMap, OpKind } from "@taquito/taquito";
import getUnixTime from 'date-fns/getUnixTime';

type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
    // probably you might want to add the currentTarget as well
    // currentTarget: T;
}

const format = (val) => `${val}%`;
const parse = (val) => val.replace(/^\%/, "");


const CreateAuctionModal: React.FC = () => {
    const toast = useToast()
    const [location, setLocation] = useLocation();
    const [creatingAuction, setCreatingAuction] = useState(false);
    const { system, collections: state } = useSelector(s => s);
    const { isOpen, onOpen, onClose } = useDisclosure()
    // * I'm lazy to use Formik so
    const [time, setTime] = useState(20);
    const [winnerShare, setWinnerShare] = useState(70);
    const [sellerShare, setSellerShare] = useState(30);
    const [selectedTokenId, setSelectedToken] = useState(null);
    const [date, setDate] = useState(new Date());
    const [lotName, setLotName] = useState('');
    const [lotDescription, setLotDescription] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [bid, setBid] = useState(0.4);
    const [numberOfBids, setNumberOfBids] = useState(1);

    const network = useSelector((s: any) => s.system.config.network);


    const handleWinnerShareChange = value => {
        setWinnerShare(value);
        setSellerShare(100 - value);
    }

    const handleSellerShareChange = value => {
        setSellerShare(value);
        setWinnerShare(100 - value);
    }

    if (!state.collections) {
        return null
    }

    const selectedCollection = state?.selectedCollection;
    const collection = state?.collections[selectedCollection] || Object.values(state.collections)[0];

    const walletTokens = collection?.tokens?.filter(
        ({ owner }: any) => owner === system.tzPublicKey
    );


    const noTokens = !collection || !walletTokens;


    // TODO: create actions for redux ;
    const handleSubmit = async () => {
        try {
            setCreatingAuction(true)
            const opensAt = `${getUnixTime(date)}`;
            const bidTimeout = `${time * 3600}`;
            const bidSize = `${bid * 1000000}`;
            const tokenId = `${selectedTokenId}`;
            const minBidCount = `${numberOfBids}`;
            const leaderPercentage = `${winnerShare}`;

            // * I know minter  does that already but who cares
            const auctionContract = await system.toolkit.wallet.at(system.config.contracts.auction);
            const nftContract = await system.toolkit.wallet.at(system.config.contracts.nftFaucet);
            const updateOperatorsParams = [system.tzPublicKey, system.config.contracts.auction, selectedTokenId];
            const startParams = [bidSize, bidTimeout, leaderPercentage, minBidCount, opensAt, "1", system.config.contracts.nftFaucet, tokenId];
            console.log({ updateOperatorsParams, startParams });
            const addOperator = new MichelsonMap();
            addOperator.set("add_operator", { bool: true })
            let methods = auctionContract.parameterSchema.ExtractSignatures();
            console.log(JSON.stringify(methods, null, 2));
            let methods2 = nftContract.parameterSchema.ExtractSignatures();
            console.log(JSON.stringify(methods2, null, 2));
            let auctionContractParams = auctionContract.methods.start(bidSize, bidTimeout, lotDescription, leaderPercentage, minBidCount, lotName, opensAt, "1", system.config.contracts.nftFaucet, tokenId).toTransferParams();
            console.log(JSON.stringify(auctionContractParams, null, 2));
            let nftContractParams = nftContract.methods.update_operators([addOperator, [system.tzPublicKey, system.config.contracts.auction, tokenId]]).toTransferParams();

            console.log(JSON.stringify(nftContractParams, null, 2));

            // await nftContract.methods.update_operators({ value: [addOperator, system.tzPublicKey, system.config.contracts.auction, selectedTokenId] }).send();
            const operation = await nftContract.methods.update_operators([
                {
                    add_operator: {
                        owner: system.tzPublicKey,
                        operator: system.config.contracts.auction,
                        token_id: selectedTokenId,
                    },
                },
            ]).send();

            await operation.confirmation(3);
            await auctionContract.methods.start(bidSize, bidTimeout, lotDescription, leaderPercentage, minBidCount, lotName, opensAt, "1", system.config.contracts.nftFaucet, tokenId).send();
            setCreatingAuction(false)
            toast({
                title: "Auction created.",
                description: "It will be public within a minute",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            setCreatingAuction(false);
            toast({
                title: "Error",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            console.log({ error })
        }

    }


    return (
        <>
            <Button onClick={onOpen}>Create Auction</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Auction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={1} spacing={4}>
                            <Box>
                                {
                                    noTokens ? <Link href='/create'
                                        onClick={e => {
                                            e.preventDefault();
                                            setLocation('/create');
                                        }} textDecor="none">Looks like you don't have NFT assets, so mint it!</Link> :
                                        <FormControl id="country">
                                            <FormLabel>Token</FormLabel>
                                            <Select placeholder="Select token" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedToken(e.target.value)}>
                                                {
                                                    walletTokens.map((token) => <option value={token.id} key={token.id}>{token.title}</option>)
                                                }
                                            </Select>
                                        </FormControl>

                                }
                            </Box>


                            <Box>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Lot Name</FormLabel>
                                    <Input value={lotName} maxLength={24} onChange={e => setLotName(e.target.value)} placeholder="My CryptoKitty" />
                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl id="description">
                                    <FormLabel>
                                        Lot Description
                            </FormLabel>
                                    <Textarea value={lotDescription} maxLength={160} onChange={e => setLotDescription(e.target.value)} placeholder="I made this kitty to make money" />
                                </FormControl>
                            </Box>

                            {/* <Box>
                                <FormControl id="seller">
                                    <FormLabel>Seller Name</FormLabel>
                                    <Input value={sellerName} maxLength={24} onChange={e => setSellerName(e.target.value)} placeholder="Some Satoshi guy" />
                                </FormControl>
                            </Box> */}

                            <Box>
                                <FormControl id="timer" isRequired>
                                    <FormLabel>Initial Timer, hours</FormLabel>
                                    <Slider aria-label="slider-ex-1" name="timer" defaultValue={20} max={24} min={1} step={1} onChange={setTime}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb fontSize="sm" boxSize="32px" children={`${time}h`} />
                                    </Slider>
                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl id="amount">
                                    <FormLabel>Bid Amount, tez</FormLabel>
                                    <NumberInput value={bid} onChange={(_, value) => setBid(value)} defaultValue={0.4} min={0.1} step={0.1} precision={4}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl id="minimumAmount">
                                    <FormLabel>Minimum Number of Bids</FormLabel>
                                    <NumberInput value={numberOfBids} onChange={(_, value) => setNumberOfBids(value)} defaultValue={1} min={0} >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl id="winnerShare">
                                    <FormLabel>Winner's Share of a Pot, %</FormLabel>

                                    <Flex>
                                        <NumberInput maxW="100px" mr="2rem" onChange={(valueString) => handleWinnerShareChange(parse(valueString))}
                                            value={format(winnerShare)}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Slider flex="1" focusThumbOnChange={false} value={winnerShare} onChange={handleWinnerShareChange}>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb fontSize="sm" boxSize="32px" children={winnerShare} />
                                        </Slider>
                                    </Flex>
                                </FormControl>
                            </Box>

                            {/* TODO: percentage logic */}
                            <Box>
                                <FormControl id="sellerShare">
                                    <FormLabel>Seller's Share of a Pot, %</FormLabel>
                                    <Flex>
                                        <NumberInput maxW="100px" mr="2rem" onChange={(valueString) => handleSellerShareChange(parse(valueString))}
                                            value={format(sellerShare)}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Slider flex="1" focusThumbOnChange={false} value={sellerShare} onChange={handleSellerShareChange}>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb fontSize="sm" boxSize="32px" children={sellerShare} />
                                        </Slider>
                                    </Flex>
                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl>
                                    <FormLabel>
                                        Auction Start Date
                            </FormLabel>
                                    <DatePicker
                                        selected={date}
                                        onChange={setDate}
                                        minDate={new Date()}
                                        dateFormat="dd.MM.yyyy"
                                        placeholderText="Select a date to place a lot"
                                    />
                                </FormControl>
                            </Box>

                            <Text fontSize="xs">You won't be able to edit or cancel your auction. NTF Button is an experiment with an unaudited smart contract, consider the funds you send to the contract as lost.</Text>

                            <Box>
                                <Center>
                                    <Button colorScheme="blue" onClick={handleSubmit}>
                                        Create Auction
                                    </Button>
                                </Center>
                            </Box>
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={creatingAuction}
                onClose={() => setCreatingAuction(false)}
                closeOnEsc={false}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent mt={40}>
                    <Flex flexDir="column" align="center" px={4} py={10}>
                        <Spinner size="xl" mb={6} color="gray.300" />
                        <Heading size="lg" textAlign="center" color="gray.500">
                            Creating auction...
                            </Heading>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateAuctionModal;
