import React from 'react'
import {
    Box,
    Flex,
    Image,
    Link,
    Text,
} from '@chakra-ui/react';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <Flex
            justifyContent='space-between'
            px={20}
            py={10}
            flex="1"
            bg="brand.brightGray"
        >
            <Flex flexDirection='column' fontFamily='IBM Plex Mono' fontWeight='600'>
                <Text >#Buttonists</Text>
                <Text>#TezosDeFiHackathon</Text>
            </Flex>
            <Flex flexDirection='column'>
                <Flex justifyContent='space-around'>
                    <Link href='#'>
                        <FontAwesomeIcon icon={faTelegramPlane} color='#0088cc' size='3x' />
                    </Link>
                    <Link href='#'>
                        <FontAwesomeIcon icon={faGithub} color='#1D2227' size='3x' />
                    </Link>
                </Flex>
                <Link to="https://nftbutton.com/" color='#0000EE' textDecoration='underline' fontFamily='IBM Plex Mono'>yo@nftbutton.com</Link>
            </Flex>
        </Flex>
    )
}

export default Footer
