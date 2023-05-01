import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcSearch, FcSupport, FcDocument, FcApproval } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10}>
        <Feature
          icon={<Icon as={FcSearch} w={10} h={10} />}
          title="Search for a service"
          text="With a quick online search, you can find countless options for almost any service you need. However, this abundance of choices can also make it difficult to find the right service provider for you."
        />
        <Feature
          icon={<Icon as={FcSupport} w={10} h={10} />}
          title="Find professionals"
          text="Whether you're looking for a painter, plumber, or any other type of professional, finding the right person for the job can be a crucial decision. You want someone who is experienced, and trustworthy, and who can provide the level of service you need."
        />
        <Feature
          icon={<Icon as={FcDocument} w={10} h={10} />}
          title="Get a quote"
          text="To get a quote, you will need to provide some basic information about your needs and requirements. Once you've provided this information, the provider will give you a quote that outlines the cost of the product or service, as well as any additional fees or charges."
        />
        <Feature
          icon={<Icon as={FcApproval} w={10} h={10} />}
          title="Enjoy the service"
          text="Now that you are all fixed up, enjoy the service you have paid for. If you're satisfied with the service, kindly provide feedback to the provider."
        />
      </SimpleGrid>
    </Box>
  );
}
