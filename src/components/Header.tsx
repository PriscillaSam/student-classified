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
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
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
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                m={2}
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                User
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href={'/profile'}>My Profile</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Link href={'/ads'}>My ads</Link>
                </MenuItem>
              </MenuList>
            </Menu>
            {session?.user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar size={'sm'} src={session.user.image || ''} />
                  {session.user.name}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                  <MenuItem>
                    <Link href={'/profile'}>My Profile</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              // <SignIn />
              <Link href={'/signup'}> Sign in</Link>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
