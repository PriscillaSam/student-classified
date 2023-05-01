'use client';

import { FaPlus } from 'react-icons/fa';
import { signOut, signIn } from 'next-auth/react';
import { Button, Center, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export function SignOut() {
  return (
    <button
      className="mt-2 mb-6 text-xs text-white hover:text-[hsl(280,100%,70%)]"
      onClick={() => signOut()}
    >
      → Sign out
    </button>
  );
}

export function SignIn() {
  return (
    <Button
      w={'full'}
      variant="solid"
      background="white"
      leftIcon={<FcGoogle />}
      onClick={() => signIn('google')}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
}
