import {
  Box,
  Flex,
  Image,
  Link,

  Menu,
  MenuButton,

  MenuItem, MenuList, Text
} from '@chakra-ui/react';
import React from 'react';
import { ChevronDown, Package, Plus } from 'react-feather';
import headerLogo from './assets/logo.svg';
import { useLocation } from 'wouter';
import { useDispatch, useSelector } from '../../reducer';
import { disconnectWallet } from '../../reducer/async/wallet';
import CreateAuctionModal from '../CreateAuctionModal';

function HeaderLink({ to, children, isFade }) {
  return (
    <Link
      href={to}
      textDecor="none"
      borderRadius="10px"
      alignItems="center"
      fontWeight="600"
      px={3}
      py={2}
      ml={4}
      bg={isFade ? 'green.500' : 'gray.400'}
      color='gray.200'
      display="flex"
      transition="none"
      _hover={isFade
        ? {
          textDecor: 'none',
          bg: 'green.400',
          color: 'gray.100'
        }
        : {
          textDecor: 'none',
          bg: 'gray.200',
          color: 'gray.100'
        }}
    >
      {children}
    </Link>
  );
}

// function WalletInfo(props: { tzPublicKey: string }) {
//   return (
//     <>
//       <Box borderRadius="100%" width={10} height={10} bg="brand.darkGray" p={1}>
//         <Image
//           src={`https://services.tzkt.io/v1/avatars2/${props.tzPublicKey}`}
//         />
//       </Box>
//       <Text fontFamily="mono" ml={4} mr={2}>
//         {props.tzPublicKey}
//       </Text>
//     </>
//   );
// }

// function WalletDisplay() {
//   const [, setLocation] = useLocation();
//   const system = useSelector(s => s.system);
//   const dispatch = useDispatch();
//   if (system.status !== 'WalletConnected') {
//     return null;
//   }
//   return (
//     <>
//       {/* <WalletInfo tzPublicKey={system.tzPublicKey} /> */}
//       <Menu placement="bottom-start">
//         <MenuButton>
//           <ChevronDown />
//         </MenuButton>
//         <MenuList color="brand.black">
//           <MenuItem
//             onClick={async () => {
//               await dispatch(disconnectWallet());
//               setLocation('/');
//             }}
//           >
//             Disconnect
//           </MenuItem>
//         </MenuList>
//       </Menu>
//     </>
//   );
// }

export function Header() {
  const [location, setLocation] = useLocation();
  if (location === '/' || location === '') {
    return null;
  }
  return (
    <Flex
      width="100%"
      bg="brand.black"
      paddingX={4}
      paddingY={3}
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to="/">
        <Image
          width="60px"
          height="60px"
          src={headerLogo}
          borderRadius="50%"
          onClick={e => {
            e.preventDefault();
            setLocation('/collections');
          }}
          cursor="pointer"
          bg="brand.white"
        />
      </Link>

      <Flex flex="1" justify="flex-end">
        <HeaderLink to="/about" isFade={false}>
          <Box color="brand.blue">
          </Box>
          <Text >About</Text>
        </HeaderLink>
        <HeaderLink to="/create" isFade={false}>
          <Box color="brand.blue">
          </Box>
          <Text >Mint NFT</Text>
        </HeaderLink>
        <CreateAuctionModal />
      </Flex>
    </Flex >
  );
}

export default Header;
