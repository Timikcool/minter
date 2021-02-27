import React from 'react'
import { Box, Flex, Text, Image, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export const CatalogItems = ({ collections, }) => (
  <Flex
    w="100%"
    px={10}
    py={6}
    flex="1"
    bg="brand.brightGray"
    borderLeftWidth="1px"
    borderLeftColor="brand.lightBlue"
    flexWrap='wrap'
    alignContent='flex-start'
  >
    {
      collections.map(({ balance, time, img, desription }) => (
        <Flex
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p='6'
          width="300px"
          height='450px'
          boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)'
          transition='all 0.2s ease-out'
          _hover={{
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
          }}
          flexDirection='column'
          m={2}
          pos='relative'
          justifyContent='space-between'
        >
          <Box pos="absolute" top="20px" right="20px" bg="green.400" p='2' borderRadius='full'>
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
          </Flex>
        </Flex>
      ))
    }
  </Flex>
)
