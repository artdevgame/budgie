import { Button, Heading, HStack } from 'native-base';
import { useIntl } from 'react-intl';
import { useModal } from 'react-modal-hook';

import { AssignCategoryModal } from './AssignCategoryModal';

interface SelectedActionsProps {
  transactionIds: string[];
}

export const SelectedActions = ({ transactionIds }: SelectedActionsProps) => {
  const { formatMessage } = useIntl();

  const [showAssignCategoryModal, hideAssignCategoryModal] = useModal(
    () => <AssignCategoryModal transactionIds={transactionIds} onClose={hideAssignCategoryModal} />,
    [transactionIds],
  );

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
        <Button onPress={showAssignCategoryModal} size="xs">
          {formatMessage({ defaultMessage: 'Assign Category' })}
        </Button>
      </HStack>
    </HStack>
  );
};
