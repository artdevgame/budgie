import { Button, IModalProps, Modal, Slide, useBreakpointValue } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { useIntl } from 'react-intl';

import type { ModalContextType } from 'react-modal-hook';

interface RemoveAccountModalProps {
  accountId: string;
  onClose: ModalContextType['hideModal'];
}

const RemoveAccount = (props: InterfaceBoxProps<IModalProps> & { onClose: RemoveAccountModalProps['onClose'] }) => {
  const { formatMessage } = useIntl();
  return (
    <Modal.Content {...props}>
      <Modal.CloseButton onPress={() => props.onClose('remove-account-modal')} />
      <Modal.Header>{formatMessage({ defaultMessage: 'Remove Account' })}</Modal.Header>
      <Modal.Body>
        {formatMessage({
          defaultMessage: `Removing your account will prevent future
            transactions syncing, but won't remove
            previously imported transactions.`,
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button colorScheme="secondary">Confirm</Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

export const RemoveAccountModal = ({ accountId, onClose }: RemoveAccountModalProps) => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: false,
  });

  return (
    <Modal
      isOpen
      onClose={onClose}
      avoidKeyboard
      justifyContent={isSmallScreen ? 'flex-end' : 'center'}
      size="lg"
      _backdrop={{
        bgColor: 'blueGray.300',
        opacity: 0.8,
      }}
    >
      {isSmallScreen ? (
        <Slide in={true} justifyContent="flex-end" placement="bottom">
          <RemoveAccount onClose={onClose} roundedBottom="0" width="full" />
        </Slide>
      ) : (
        <RemoveAccount onClose={onClose} />
      )}
    </Modal>
  );
};
