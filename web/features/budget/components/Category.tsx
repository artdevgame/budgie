import { Badge, Box, Checkbox, HStack, Input, Text } from 'native-base';

interface CategoryProps {
  id: string;
  name: string;
}

export const Category = ({ id, name }: CategoryProps) => {
  return (
    <HStack
      alignItems="center"
      px="4"
      py="2.5"
      borderTopColor="blueGray.300"
      borderTopWidth="1"
      borderTopStyle="dotted"
      space="4"
    >
      <Checkbox value={id} />
      <Text flexGrow="1" fontSize="xs" fontWeight="medium" color="muted.600">
        {name}
      </Text>
      <HStack justifyContent="flex-end" flexBasis="15%" alignItems="center" space="1">
        <Text>&pound;</Text>
        <Input width="full" maxW="24" placeholder="0.00" textAlign="right" />
      </HStack>
      <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.600">
        -&pound;600
      </Text>
      <Box alignItems="flex-end" flexBasis="15%" width="0">
        <Badge variant="outline" colorScheme="success">
          &pound;500
        </Badge>
      </Box>
    </HStack>
  );
};
