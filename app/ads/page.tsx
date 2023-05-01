'use client';

import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import Listing from 'components/FeaturedListings';
const ads = [
  {
    id: '1',
    title: 'Best plumbing available',
    description:
      'Have you been looking for a plumber? Look no further. This is a one stop shop for all your plumbing needs',
    priceRange: '120-350/hr',
    isActive: true,
    location: 'Lagos',
  },

  {
    id: '2',
    title: 'Painting service',
    description: "This is the best painting job you've gotten done",
    priceRange: '120-350/hr',
    isActive: true,
    location: 'Benin',
  },

  {
    id: '3',
    title: 'Home cleaning service',
    description: 'Clean your apartment at a fair and reasonable rate',
    priceRange: '120-350/hr',
    isActive: true,
    location: 'Lagos',
  },
];

export default function Profile() {
  return (
    <Container maxW={'8xl'} mt={100}>
      <Heading size="l">Current Ads</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 4 }}
        spacing={10}
        mt={50}
        mb={50}
      >
        {ads.map((ad) => (
          <Listing key={ad.id} ad={ad} />
        ))}
      </SimpleGrid>

      <Heading>Deactivated Ads</Heading>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10} mt={50}>
        {ads.map((ad) => (
          <Listing key={ad.id} ad={{ ...ad, isActive: false }} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
