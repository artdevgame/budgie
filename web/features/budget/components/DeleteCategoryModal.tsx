import { Button, IModalProps, Modal, Slide, useBreakpointValue } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { useIntl } from 'react-intl';

import type { ModalContextType } from 'react-modal-hook';

interface DeleteCategoryModalProps {
  onClose: ModalContextType['hideModal'];
}

const DeleteCategory = (props: InterfaceBoxProps<IModalProps> & { onClose: DeleteCategoryModalProps['onClose'] }) => {
  const { formatMessage } = useIntl();
  return (
    <Modal.Content {...props}>
      <Modal.CloseButton onPress={() => props.onClose('close-delete-category-modal')} />
      <Modal.Header>{formatMessage({ defaultMessage: 'Delete Category' })}</Modal.Header>
      <Modal.Body>
        {formatMessage({
          defaultMessage:
            'Removing this category will unassign any allocated budget, which can then be allocated to a different one.',
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button colorScheme="secondary">Delete Category</Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

export const DeleteCategoryModal = ({ onClose }: DeleteCategoryModalProps) => {
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
          <DeleteCategory onClose={onClose} roundedBottom="0" width="full" />
        </Slide>
      ) : (
        <DeleteCategory onClose={onClose} />
      )}
    </Modal>
  );
};
