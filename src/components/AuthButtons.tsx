'use client';

import { FaPlus } from 'react-icons/fa';
import { signOut, signIn } from 'next-auth/react';
import { Button } from '@chakra-ui/react';

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
      variant={'solid'}
      colorScheme={'teal'}
      size={'sm'}
      mr={4}
      leftIcon={<FaPlus />}
      onClick={() => signIn('google')}
    >
      Signup
    </Button>
  );
}
