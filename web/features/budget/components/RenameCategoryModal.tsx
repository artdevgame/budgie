import {
    Button, FormControl, IModalProps, Input, Modal, Slide, useBreakpointValue
} from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';

import type { ModalContextType } from 'react-modal-hook';

interface RenameCategoryModalProps {
  onClose: ModalContextType['hideModal'];
}

const RenameCategory = (props: InterfaceBoxProps<IModalProps> & { onClose: RenameCategoryModalProps['onClose'] }) => {
  return (
    <Modal.Content {...props}>
      <Modal.CloseButton onPress={() => props.onClose('close-delete-category-modal')} />
      <Modal.Header>Edit Category Name</Modal.Header>
      <Modal.Body>
        <FormControl>
          <Input placeholder="Mortgage" />
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button>Update</Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

export const RenameCategoryModal = ({ onClose }: RenameCategoryModalProps) => {
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
          <RenameCategory onClose={onClose} roundedBottom="0" width="full" />
        </Slide>
      ) : (
        <RenameCategory onClose={onClose} />
      )}
    </Modal>
  );
};
