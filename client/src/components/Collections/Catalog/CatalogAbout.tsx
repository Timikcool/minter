import React from 'react'
import { Flex, Box, Text, Image } from '@chakra-ui/react';
import flowImage from './assets/flow.png'

export const CatalogAbout = () => {
    return (
        <Flex w="100%"
            px={10}
            mt={10}
            flex="1"
            borderLeftWidth="1px"
            borderLeftColor="brand.lightBlue"
            flexDirection='column'
        >
            <Text as='h2' fontWeight='bold' fontSize='36px' my='10' textAlign='center'>How NFT Button works</Text>
            <Box>
                <Image src={flowImage} />
            </Box>
            <Text as='h2' fontWeight='bold' fontSize='36px' my='10' width='50%' textAlign='center' alignSelf='flex-end'>What is it</Text>
            <Text my='4' fontSize='16px' width='50%' alignSelf='flex-end'>
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
        </Flex>
    )
}
