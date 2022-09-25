import { Button, Heading, HStack } from 'native-base';

export const SelectedActions = () => {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      px="4"
      py="2"
      bgColor="warmGray.100"
      borderTopColor="warmGray.400"
      borderTopWidth="2"
    >
      <Heading fontSize="xs" color="muted.900">
        With selected:
      </Heading>
      <HStack space="4">
        <Button colorScheme="secondary" size="xs">
          Delete Category
        </Button>
        <Button size="xs">Rename Category</Button>
      </HStack>
    </HStack>
  );
};
