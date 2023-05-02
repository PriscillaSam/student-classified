'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Text,
  IconButton,
  VStack,
  Select,
  Container,
  Avatar,
  Circle,
  Flex,
  WrapItem,
  List,
  ListItem,
  SimpleGrid,
  useColorModeValue,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  AvatarBadge,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { CiLocationOn, CiEdit } from 'react-icons/ci';
import { BsPhone } from 'react-icons/bs';
import fetchStates from 'utils/fetchStates';

import Listing from 'components/FeaturedListings';
import { Ad } from '../../src/types';

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: session } = useSession();
  const [ads, setAds] = useState<Ad[]>([]);
  const [states, setStates] = React.useState<string[]>([]);
  const [state, setState] = React.useState({
    phone: '',
    street: '',
    location: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const saveProfile = async () => {
    // const res = await fetch('/api/ad', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(state),
    // });
    // console.log(res);
  };

  useEffect(() => {
    (async () => {
      const states = await fetchStates();
      setStates(states);
    })();
  }, []);

  useEffect(() => {
    fetch('/api/ad', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setAds(data);
      });
  }, []);

  return (
    <>
      <Flex
        maxW="xl"
        p={0}
        flexDirection="column"
        alignItems="center"
        style={{ margin: '4em auto' }}
      >
        <Avatar
          size="2xl"
          name={session?.user?.name as string}
          src={session?.user?.image as string}
          mb={5}
        >
          <AvatarBadge borderColor="papayawhip" bg="tomato" boxSize="1em">
            <IconButton aria-label="edit" variant="ghost" onClick={onOpen}>
              <CiEdit />
            </IconButton>
          </AvatarBadge>
        </Avatar>
        <Heading size="lg">{session?.user?.name}</Heading>
        <Flex
          alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          mt={3}
          gap={2}
          mb={2}
          direction={{ base: 'column', md: 'row' }}
        >
          <WrapItem alignItems="center" mr={50}>
            <Circle size={'30px'} bg="gray.200" color="gray.700" mr={2}>
              <BsPhone />
            </Circle>
            <Text>+234 809742978</Text>
          </WrapItem>
          <WrapItem alignItems="center">
            <Circle size={'30px'} bg="gray.200" color="gray.700" mr={2}>
              <CiLocationOn />
            </Circle>
            <Text>{'Lagos'}</Text>
          </WrapItem>
        </Flex>

        <Divider m={'30'} />
        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('yellow.500', 'yellow.300')}
            fontWeight={'500'}
            textTransform={'uppercase'}
            mb={'4'}
          >
            Skills
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
        <Divider mt={'30'} />
      </Flex>

      <Container maxW={'8xl'} mt={100} mb={100}>
        <Heading size="lg" textAlign="center">
          Current Ads
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 4 }}
          spacing={10}
          mt={50}
          mb={50}
        >
          {ads.map((ad) => (
            <Listing key={ad.id} ad={ad} />
          ))}
        </SimpleGrid>

        <Heading size="lg" textAlign="center">
          Deactivated Ads
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10} mt={50}>
          {ads.map((ad) => (
            <Listing key={ad.id} ad={{ ...ad, isActive: false }} />
          ))}
        </SimpleGrid>
      </Container>

      {/* Modal starts here */}
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Update your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderRadius="lg">
              <VStack spacing={{ base: 4, md: 8, lg: 10 }}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>

                  <InputGroup>
                    <Input
                      type="text"
                      name="email"
                      value={session?.user?.email || ''}
                      disabled
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Location</FormLabel>
                  <Select
                    placeholder="Select State"
                    onChange={(e) => handleChange(e as any)}
                    name="state"
                    value={state.location}
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e as any)}
                    name="phone"
                    placeholder="Enter your phone number"
                  />
                </FormControl>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={saveProfile}
            >
              Save Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
