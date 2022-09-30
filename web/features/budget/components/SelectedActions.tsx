import { Button, Heading, HStack } from 'native-base';
import { useModal } from 'react-modal-hook';

import { DeleteCategoryModal } from './DeleteCategoryModal';
import { RenameCategoryModal } from './RenameCategoryModal';

export const SelectedActions = () => {
  const [showDeleteCategoryModal, hideDeleteCategoryModal] = useModal(() => (
    <DeleteCategoryModal onClose={hideDeleteCategoryModal} />
  ));
  const [showRenameCategoryModal, hideRenameCategoryModal] = useModal(() => (
    <RenameCategoryModal onClose={hideRenameCategoryModal} />
  ));

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
        <Button onPress={showDeleteCategoryModal} colorScheme="secondary" size="xs">
          Delete Category
        </Button>
        <Button onPress={showRenameCategoryModal} size="xs">
          Rename Category
        </Button>
      </HStack>
    </HStack>
  );
};
