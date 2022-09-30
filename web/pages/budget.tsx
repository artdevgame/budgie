import { BudgetHeader } from 'features/budget/components/BudgetHeader';
import { CategoryGroup } from 'features/budget/components/CategoryGroup';
import { SelectedActions } from 'features/budget/components/SelectedActions';
import { MainLayout } from 'features/common/components/MainLayout';
import { categoriesStub } from 'features/common/stubs/categories';
import { categoryGroupsStub } from 'features/common/stubs/category-groups';
import {
    AddIcon, Box, Button, Checkbox, HStack, Text, useMediaQuery, useTheme, VStack
} from 'native-base';
import { useEffect, useState } from 'react';

export default function Budget() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { breakpoints } = useTheme();

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  const allCategories = new Set<string>();

  Object.entries(categoriesStub).forEach(([categoryId, category]) => {
    allCategories.add(categoryId);
    allCategories.add(category.categoryGroupId);
  });

  const totalCategories = Array.from(allCategories).length;

  const handleToggleCategories = (selectedIds: string[]) => {
    const isSelecting = selectedIds.length > selectedCategories.length;
    const [id] = isSelecting
      ? selectedIds.filter((category) => !selectedCategories.includes(category))
      : selectedCategories.filter((category) => !selectedIds.includes(category));

    const selectedCategory = categoriesStub[id];

    if (!selectedCategory) {
      // toggling one of the category groups
      return setSelectedCategories(selectedIds);
    }

    if (!isSelecting) {
      // deselecting: uncheck the parent group
      return setSelectedCategories(selectedIds.filter((_id) => _id !== selectedCategory.categoryGroupId));
    }

    const categoriesInGroup = Object.entries(categoriesStub)
      .filter(([_, category]) => category.categoryGroupId === selectedCategory.categoryGroupId)
      .map(([categoryId]) => categoryId);

    categoriesInGroup.every((id) => selectedIds.includes(id)) && !selectedIds[selectedCategory.categoryGroupId]
      ? setSelectedCategories([...selectedIds, selectedCategory.categoryGroupId])
      : setSelectedCategories(selectedIds);
  };

  const handleToggleRows = (isSelected: boolean) => {
    if (!isSelected) {
      return setSelectedCategories([]);
    }

    setSelectedCategories(Array.from(allCategories));
  };

  const handleToggleGroup = (groupId: string) => {
    return (isSelected: boolean) => {
      const categories = Object.entries(categoriesStub)
        .map(([categoryId, category]) => {
          if (groupId === category.categoryGroupId) {
            return categoryId;
          }
        })
        .filter(Boolean);

      categories.push(groupId);

      if (isSelected) {
        return setSelectedCategories(Array.from(new Set<string>([...selectedCategories, ...categories])));
      }

      setSelectedCategories(selectedCategories.filter((categoryId) => !categories.includes(categoryId)));
    };
  };

  const budget = Object.entries(categoryGroupsStub)
    .sort((a, b) => (a[1].order > b[1].order ? 1 : -1))
    .map(([groupId, group]) => {
      return (
        <CategoryGroup
          key={`category-group-${groupId}`}
          handleToggleGroup={handleToggleGroup(groupId)}
          id={groupId}
          {...group}
        />
      );
    });

  useEffect(() => {
    setSelectedCategories([]);
  }, [isSmallScreen]);

  return (
    <MainLayout>
      <BudgetHeader />
      <Box flexGrow="1" bgColor="white" m="4" mb="0">
        <Box
          p="2"
          bgColor="gray.50"
          alignItems="flex-start"
          borderBottomStyle="dotted"
          borderBottomColor="light.200"
          borderBottomWidth="1"
        >
          <Button variant="unstyled" fontWeight="medium" size="xs" startIcon={<AddIcon size="2xs" />}>
            Category
          </Button>
        </Box>
        <HStack bgColor="gray.50" p="4" space="4" alignItems="center">
          {!isSmallScreen && (
            <Checkbox
              value="-"
              accessibilityLabel="Toggle rows"
              onChange={handleToggleRows}
              isChecked={selectedCategories.length === totalCategories}
            />
          )}
          <Text flexGrow="1" fontSize="xs" fontWeight="medium" color="muted.500">
            CATEGORY
          </Text>
          {!isSmallScreen && (
            <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.500">
              BUDGETED
            </Text>
          )}
          <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.500">
            ACTIVITY
          </Text>
          <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.500">
            AVAILABLE
          </Text>
        </HStack>

        <VStack flexGrow="1">
          <Checkbox.Group
            key={selectedCategories.length}
            accessibilityLabel="Budget categories"
            defaultValue={selectedCategories}
            onChange={handleToggleCategories}
          >
            {budget}
          </Checkbox.Group>
        </VStack>

        {selectedCategories.length > 0 && <SelectedActions />}
      </Box>
    </MainLayout>
  );
}
