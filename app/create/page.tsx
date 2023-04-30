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
import { Category } from '@prisma/client';
import React, { useEffect } from 'react';

async function fetchCategories() {
  const res = await fetch('/api/category');
  const categories = await res.json();
  return categories;
}

export default function CreateAd() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [state, setState] = React.useState({
    title: '',
    description: 'description',
    category: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const saveAd = async () => {
    const res = await fetch('/api/ad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    console.log(res);
  };

  useEffect(() => {
    (async () => {
      const categories = await fetchCategories();
      setCategories(categories);
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
          Post your Ad
        </Heading>
        <FormControl isRequired>
          <FormLabel>Listing title</FormLabel>

          <InputGroup>
            <Input
              onChange={handleChange}
              type="text"
              name="title"
              placeholder="Give this ad a title"
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            onChange={(e) => handleChange(e as any)}
            name="category"
            value={state.category}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            onChange={(e) => handleChange(e as any)}
            name="message"
            placeholder="Enter your description"
            rows={6}
            resize="none"
          />
        </FormControl>

        <Button
          colorScheme="blue"
          bg="blue.400"
          color="white"
          _hover={{
            bg: 'blue.500',
          }}
          onClick={saveAd}
        >
          Create Ad
        </Button>
      </VStack>
    </Box>
  );
}
