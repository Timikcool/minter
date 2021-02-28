import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useSelector } from '../../reducer';

const BidButton: React.FC<{ auction: any }> = ({ auction }) => {
    const { system } = useSelector(s => s);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const BidToAuction = async () => {
        try {
            setLoading(true);
            const auctionContract = await system.toolkit.wallet.at(system.config.contracts.auction);
            const operation = await auctionContract.methods.bid(auction.id).send({ amount: auction.bid_size, mutez: true })
            await operation.confirmation()
            setLoading(false);
            toast({
                title: "Bid placed",
                description: "",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast({
                title: "Bid placement error.",
                duration: 9000,
                isClosable: true,
            })
        }

    }
    return (
        <Button variant="solid" isLoading={loading} colorScheme="purple" onClick={BidToAuction}>
            Press to Bid Now
        </Button>
    )
}

export default BidButton;