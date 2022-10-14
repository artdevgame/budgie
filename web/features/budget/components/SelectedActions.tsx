import { Button, Heading, HStack } from 'native-base';
import { useIntl } from 'react-intl';
import { useModal } from 'react-modal-hook';

import { DeleteCategoryModal } from './DeleteCategoryModal';
import { RenameCategoryModal } from './RenameCategoryModal';

interface SelectedActionsProps {
  categories: string[];
}

export const SelectedActions = ({ categories }: SelectedActionsProps) => {
  const { formatMessage } = useIntl();

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
        {formatMessage({ defaultMessage: 'With selected:' })}
      </Heading>
      <HStack space="4">
        <Button onPress={showDeleteCategoryModal} colorScheme="secondary" size="xs">
          {formatMessage({ defaultMessage: 'Delete Category' })}
        </Button>
        <Button onPress={showRenameCategoryModal} size="xs">
          {formatMessage({ defaultMessage: 'Rename Category' })}
        </Button>
      </HStack>
    </HStack>
  );
};
