'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Textarea,
  VStack,
  Select,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
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
  );
}
