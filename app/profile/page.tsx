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
  VStack,
  Select,
  Container,
  Avatar,
  Circle,
  Flex,
  WrapItem,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { CiLocationOn, CiPhone } from 'react-icons/ci';
import { BsPhone } from 'react-icons/bs';
import fetchStates from 'utils/fetchStates';

export default function CreateAd() {
  const { data: session } = useSession();

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
    const res = await fetch('/api/ad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    console.log(res);
  };

  useEffect(() => {
    (async () => {
      const states = await fetchStates();
      setStates(states);
    })();
  }, []);

  return (
    <>
      <Flex
        maxW="xl"
        p={0}
        flexDirection="column"
        alignItems="center"
        style={{ margin: 'auto' }}
      >
        <Avatar
          size="2xl"
          name={session?.user?.name as string}
          src={session?.user?.image as string}
        />
        <Heading size="lg">{session?.user?.name}</Heading>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mt={3}
          gap={2}
          mb={2}
        >
          <WrapItem alignItems="center" mr={50}>
            <Circle size={'30px'} bg="gray.200" color="gray.700" mr={2}>
              <BsPhone />
            </Circle>
            <Text>+2348012345678</Text>
          </WrapItem>
          <WrapItem alignItems="center">
            <Circle size={'30px'} bg="gray.200" color="gray.700" mr={2}>
              <CiLocationOn />
            </Circle>
            <Text>{'Lagos'}</Text>
          </WrapItem>
        </Flex>
      </Flex>
      <Box
        borderRadius="lg"
        p={{ base: 5, lg: 16 }}
        style={{ maxWidth: '600px', margin: 'auto' }}
      >
        <VStack spacing={{ base: 4, md: 8, lg: 10 }}>
          <Heading
            fontSize={{
              base: '4xl',
              md: '5xl',
            }}
          >
            Update your profile
          </Heading>
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

          <Button
            colorScheme="blue"
            bg="blue.400"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={saveProfile}
          >
            Save Profile
          </Button>
        </VStack>
      </Box>
    </>
  );
}
