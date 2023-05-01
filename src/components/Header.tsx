'use client';

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { SignIn } from './AuthButtons';

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

const Links: string[] = ['create'];

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const isActive: (path: string) => boolean = (path) => path === pathname;

  const { data: session } = useSession();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link href="/">Student Classifieds</Link>
            </Box>
            {session?.user ? (
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link) => (
                  <NavLink key={link} href={link}>
                    {link}
                  </NavLink>
                ))}
              </HStack>
            ) : (
              <Link href="/signup">Sign Up</Link>
            )}
          </HStack>
          <Flex alignItems={'center'}>
            {session?.user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Flex alignItems={'center'}>
                    <Avatar size={'sm'} src={session.user.image || ''} />
                    {session.user.name}
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Link href={'/profile'}>My Profile</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Link href={'/ads'}>My Ads</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <SignIn />
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} href={link}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
