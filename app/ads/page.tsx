'use client';

import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import Listing from 'components/FeaturedListings';

export default function Profile() {
  return (
    <Container maxW={'8xl'} mt={100}>
      <Heading>Current Ads</Heading>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10} mt={50}>
        <Listing />
        <Listing />
        <Listing />
        <Listing />
      </SimpleGrid>

      <Heading>Deactivated Ads</Heading>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10} mt={50}>
        <Listing />
        <Listing />
        <Listing />
        <Listing />
      </SimpleGrid>
    </Container>
  );
}
