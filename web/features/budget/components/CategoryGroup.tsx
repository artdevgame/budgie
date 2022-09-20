import { categoriesStub } from 'features/common/stubs/categories';
import {
    Badge, Box, Checkbox, ChevronDownIcon, HStack, IconButton, Input, Text, VStack
} from 'native-base';

import { Category } from './Category';

interface CategoryGroupProps {
  id: string;
  name: string;
  order: number;
}

export const CategoryGroup = ({ id, name }: CategoryGroupProps) => {
  const categories = Object.entries(categoriesStub)
    .filter(([_, category]) => category.categoryGroupId === id)
    .sort((a, b) => (a[1].order > b[1].order ? 1 : -1))
    .map(([categoryId, category]) => {
      return <Category id={categoryId} {...category} />;
    });

  return (
    <VStack>
      <HStack
        space="4"
        alignItems="center"
        px="4"
        py="2.5"
        bgColor="warmGray.100"
        borderTopColor="warmGray.200"
        borderTopWidth="1"
      >
        <Checkbox value={id} />
        <HStack alignItems="center" space="0.5" flexGrow="1">
          <IconButton size="xs" icon={<ChevronDownIcon color="muted.500" />} ml="-1.5" />
          <Text fontSize="xs" fontWeight="medium" color="muted.600">
            {name}
          </Text>
        </HStack>
        <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.600">
          &pound;1100
        </Text>
        <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.600">
          -&pound;600
        </Text>
        <Box alignItems="flex-end" flexBasis="15%" width="0">
          <Badge variant="outline" colorScheme="success">
            &pound;500
          </Badge>
        </Box>
      </HStack>
      {categories}
    </VStack>
  );
};
