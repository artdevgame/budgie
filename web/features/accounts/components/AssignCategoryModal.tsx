import {
    Button, IModalProps, Modal, Select, Slide, Text, useBreakpointValue, VStack
} from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { categoriesStub } from 'stubs/categories';

import type { ModalContextType } from 'react-modal-hook';

interface FormFields {
  category: string;
}

interface AssignCategoryModalProps {
  onClose: ModalContextType['hideModal'];
  transactionIds: string[];
}

const AssignCategory = (props: InterfaceBoxProps<IModalProps> & { onClose: AssignCategoryModalProps['onClose'] }) => {
  const { formatMessage } = useIntl();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      category: '',
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data);

  const formValues = watch();
  const categories = Object.entries(categoriesStub).sort((a, b) => a[1].name.localeCompare(b[1].name));

  useEffect(() => {
    if (!formValues.category.trim()) return;
    onSubmit(formValues);
  }, [formValues]);

  return (
    <Modal.Content {...props}>
      <Modal.CloseButton onPress={() => props.onClose('close-assign-category-modal')} />
      <Modal.Header>{formatMessage({ defaultMessage: 'Assign Category' })}</Modal.Header>
      <Modal.Body>
        <VStack space="4">
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            render={({ field: { ref, ...other } }) => (
              <Select {...other} onValueChange={(v) => setValue('category', v)}>
                {categories.map(([categoryId, category]) => (
                  <Select.Item key={categoryId} label={category.name} value={categoryId} />
                ))}
              </Select>
            )}
          />
          {errors.category && (
            <Text fontSize="xs" color="red.400">
              {formatMessage({ defaultMessage: 'Category is required' })}
            </Text>
          )}
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
};

export const AssignCategoryModal = ({ onClose }: AssignCategoryModalProps) => {
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
          <AssignCategory onClose={onClose} roundedBottom="0" width="full" />
        </Slide>
      ) : (
        <AssignCategory onClose={onClose} />
      )}
    </Modal>
  );
};
