import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
  Divider,
  Tooltip,
  IconButton,
  Center,
  Circle,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf, BsEye } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { Ad } from '../types';
import Link from 'next/link';
import { useState } from 'react';

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  );
}

function Listing({
  ad: { id, title, description, priceRange, isActive, location, category },
}: {
  ad: Ad;
}) {
  const [error, setError] = useState(false);

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={error ? data.imageURL : `/${category.name.toLowerCase()}.jpeg`}
          alt={`Picture of ${category.name}`}
          roundedTop="lg"
          height={200}
          width={500}
          onError={() => setError(true)}
        />

        <Box p="6">
          <Box>
            <Badge
              rounded="full"
              px="2"
              fontSize="0.6em"
              colorScheme={isActive ? 'green' : 'red'}
            >
              {isActive ? 'Active' : 'Deactivated'}
            </Badge>
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="l"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {title}
            </Box>
          </Flex>
          <Flex alignItems="center" mt={3} gap={2} mb={2}>
            <Circle size={'20px'} bg="green.700" color="white">
              <CiLocationOn />
            </Circle>
            <Text>{location ?? 'Lagos'}</Text>
          </Flex>
          <Text fontWeight={500} mb={5}>
            {priceRange ? `₦${priceRange}/hr` : '₦120-130/hr'}
          </Text>

          <Divider />
          <Flex justifyContent="space-between" alignItems="center" pt={5}>
            <Flex gap={2}>
              <Tooltip hasArrow label="View Ad" bg="gray.500" color="white">
                <Link href={`/ads/${id}`}>
                  <IconButton
                    variant="outline"
                    borderRadius={50}
                    icon={<BsEye />}
                    aria-label="View Ad"
                  />
                </Link>
              </Tooltip>
              <Tooltip hasArrow label="Review Ad" bg="gray.500" color="white">
                <Link href={`/ads/${id}`}>
                  <IconButton
                    variant="outline"
                    borderRadius={50}
                    icon={<BsStar />}
                    aria-label="Review Ad"
                  />
                </Link>
              </Tooltip>
            </Flex>

            <Text fontSize="s" fontWeight="bold">
              170 views
            </Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Listing;
