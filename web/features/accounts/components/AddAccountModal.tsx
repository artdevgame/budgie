import {
    Button, Divider, HStack, Image, IModalProps, Modal, Slide, Text, useBreakpointValue, VStack
} from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { useIntl } from 'react-intl';

import { useQuery } from '@tanstack/react-query';

import type { ModalContextType } from 'react-modal-hook';

interface AddAccountModalProps {
  onClose: ModalContextType['hideModal'];
}

const AddAccount = (props: InterfaceBoxProps<IModalProps> & { onClose: AddAccountModalProps['onClose'] }) => {
  const { formatMessage } = useIntl();

  const { data: banks, isFetching } = useQuery(['banks'], async () => {
    const res = await fetch('/api/nordigen/getBanks');
    return res.json();
  });

  if (isFetching) {
    return null;
  }

  return (
    <Modal.Content {...props}>
      <Modal.CloseButton onPress={() => props.onClose('remove-account-modal')} />
      <Modal.Header>{formatMessage({ defaultMessage: 'Add Account' })}</Modal.Header>
      <Modal.Body>
        <VStack space="4">
          {banks.map((bank) => (
            <HStack alignItems="center" space="2">
              <Image src={bank.logo} height="28" width="28" />
              <Text>{bank.name}</Text>
            </HStack>
          ))}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button colorScheme="primary">Confirm</Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

export const AddAccountModal = ({ onClose }: AddAccountModalProps) => {
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
          <AddAccount onClose={onClose} roundedBottom="0" width="full" />
        </Slide>
      ) : (
        <AddAccount onClose={onClose} />
      )}
    </Modal>
  );
};
