'use client';

import {
  Flex,
  Box,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Divider,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { BsFacebook } from 'react-icons/bs';
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
              leftIcon={<FcGoogle size={25} />}
              onClick={() => signIn('google', { callbackUrl: '/profile' })}
            >
              <Text>Sign in with Google</Text>
            </Button>
            <Button
              w={'full'}
              variant={'outline'}
              leftIcon={<BsFacebook color="#4299e1" size={25} />}
            >
              <Text>Sign in with Facebook</Text>
            </Button>

            <Text align="center">Or</Text>
            <Divider />

            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
