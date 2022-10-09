import {
    Button, Checkbox, FormControl, IModalProps, Input, Modal, Slide, Text, useBreakpointValue,
    VStack, WarningOutlineIcon
} from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import type { ModalContextType } from 'react-modal-hook';

interface FormFields {
  isGroup?: boolean;
  name: string;
}

interface AddCategoryModalProps {
  onClose: ModalContextType['hideModal'];
}

const AddCategory = (props: InterfaceBoxProps<IModalProps> & { onClose: AddCategoryModalProps['onClose'] }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      isGroup: false,
      name: '',
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data);

  return (
    <Modal.Content {...props}>
      <Modal.CloseButton onPress={() => props.onClose('close-delete-category-modal')} />
      <Modal.Header>Add Category</Modal.Header>
      <Modal.Body>
        <VStack space="4">
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field }) => (
              <Input placeholder="New category name..." {...field} onSubmitEditing={handleSubmit(onSubmit)} />
            )}
          />
          {errors.name && (
            <Text fontSize="xs" color="red.400">
              Category name is required
            </Text>
          )}

          <Controller
            control={control}
            name="isGroup"
            rules={{ required: false }}
            render={({ field: { onChange, name, value } }) => (
              <Checkbox name={name} onChange={onChange} value={value.toString()} _text={{ fontSize: 'xs' }}>
                Treat this category as a group
              </Checkbox>
            )}
          />

          {errors.isGroup && (
            <Text fontSize="xs" color="red.400">
              {errors.isGroup.type}
            </Text>
          )}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={handleSubmit(onSubmit)}>Create</Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

export const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
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
          <AddCategory onClose={onClose} roundedBottom="0" width="full" />
        </Slide>
      ) : (
        <AddCategory onClose={onClose} />
      )}
    </Modal>
  );
};
