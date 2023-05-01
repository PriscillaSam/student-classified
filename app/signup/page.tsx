'use client';

import {
  Flex,
  Box,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Center,
  Text,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function SignUp() {
  return (
    <Flex
      minH={'calc(100vh - 4rem)'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign into your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Button
              w={'full'}
              variant={'outline'}
              leftIcon={<FcGoogle />}
              onClick={() => signIn('google')}
            >
              <Center>
                <Text>Sign in with Google</Text>
              </Center>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
