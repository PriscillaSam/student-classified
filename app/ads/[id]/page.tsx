'use client';

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Circle,
  IconButton,
} from '@chakra-ui/react';
import { BsStar } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';

export default function Simple() {
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src="/painting.jpeg"
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              Painting Service
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              #120-130/hr
            </Text>
          </Box>

          <Flex alignItems="center" gap={5}>
            <Circle size={'20px'} bg="green.700" color="white">
              <CiLocationOn />
            </Circle>
            <Text
              color={useColorModeValue('gray.500', 'gray.400')}
              fontSize={'2xl'}
              fontWeight={'300'}
            >
              Lagos
            </Text>
          </Flex>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={'lg'}>
                A painting service provides a professional and efficient
                solution for homeowners and businesses looking to refresh the
                appearance of their property. Whether its an interior or
                exterior job, a painting service can transform a space and give
                it a fresh new look. We have the expertise and experience to
                provide high-quality painting services that meet the unique
                needs of each customer. We use high-quality paints and tools to
                ensure a smooth and even finish that looks great and lasts for
                years to come.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Services
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Interior Painting</ListItem>
                  <ListItem>Drywall repair</ListItem>{' '}
                </List>
                <List spacing={2}>
                  <ListItem>Exterior Painting</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Leave a review
              </Text>

              <IconButton
                variant="outline"
                borderRadius={50}
                icon={<BsStar />}
                aria-label="Review Ad"
              />
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
