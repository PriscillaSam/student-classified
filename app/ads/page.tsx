'use client';

import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import Listing from 'components/FeaturedListings';
import { useState, useEffect } from 'react';
import { Ad } from '../../src/types';

export default function Profile() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetch('/api/ad', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setAds(data);
      });
  }, []);

  return (
    <Container maxW={'8xl'} mt={100}>
      <Heading>Current Ads</Heading>
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
