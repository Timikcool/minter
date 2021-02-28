import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useSelector } from '../../reducer';

const BidButton: React.FC<{ auction: any }> = ({ auction }) => {
    const { system } = useSelector(s => s);
    const [loading, setLoading] = useState(false);

    const BidToAuction = async () => {
        try {
            setLoading(true);
            const auctionContract = await system.toolkit.wallet.at(system.config.contracts.auction);
            const operation = await auctionContract.methods.bid(auction.token?.[1]?.value).send({ amount: auction.bid_size, mutez: true })
            await operation.confirmation()
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }
    return (
        <Button variant="solid" colorScheme="purple" onClick={BidToAuction}>
            Press to Bid Now
        </Button>
    )
}

export default BidButton;