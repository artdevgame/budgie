import { categoriesStub } from 'features/common/stubs/categories';
import {
    Badge, Box, Checkbox, ChevronDownIcon, ChevronRightIcon, HStack, IconButton, Text,
    useMediaQuery, useTheme, VStack
} from 'native-base';
import { useState } from 'react';

import { Category } from './Category';

interface CategoryGroupProps {
  handleToggleGroup(isSelected: boolean): void;
  id: string;
  name: string;
  order: number;
}

export const CategoryGroup = ({ handleToggleGroup, id, name }: CategoryGroupProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { breakpoints } = useTheme();

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  const categories = Object.entries(categoriesStub)
    .filter(([_, category]) => category.categoryGroupId === id)
    .sort((a, b) => (a[1].order > b[1].order ? 1 : -1))
    .map(([categoryId, category]) => {
      return <Category key={`category-${categoryId}`} id={categoryId} {...category} />;
    });

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <VStack width="full">
      <HStack
        space="4"
        alignItems="center"
        px="4"
        py="2.5"
        bgColor="warmGray.100"
        borderTopColor="warmGray.200"
        borderTopWidth="1"
      >
        {!isSmallScreen && <Checkbox value={id} accessibilityLabel={name} onChange={handleToggleGroup} />}
        <HStack alignItems="center" space="0.5" flexGrow="1">
          <IconButton
            size="xs"
            icon={isCollapsed ? <ChevronRightIcon color="muted.500" /> : <ChevronDownIcon color="muted.500" />}
            ml="-1.5"
            onPress={handleToggleCollapse}
          />
          <Text fontSize="xs" fontWeight="medium" color="muted.600">
            {name}
          </Text>
        </HStack>
        {!isSmallScreen && (
          <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.600">
            &pound;1100
          </Text>
        )}
        <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.600">
          -&pound;600
        </Text>
        <Box alignItems="flex-end" flexBasis="15%" width="0">
          <Badge variant="outline" colorScheme="success">
            &pound;500
          </Badge>
        </Box>
      </HStack>
      {!isCollapsed && categories}
    </VStack>
  );
};
