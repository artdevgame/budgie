import { categoriesStub } from 'features/common/stubs/categories';
import { categoryGroupsStub } from 'features/common/stubs/category-groups';
import {
    Button, FormControl, IModalProps, Input, Modal, Slide, Text, useBreakpointValue, VStack
} from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ModalContextType } from 'react-modal-hook';

interface RenameCategoryModalProps {
  categories: string[];
  onClose: ModalContextType['hideModal'];
}

type RenameCategoryProps = InterfaceBoxProps<IModalProps> & RenameCategoryModalProps;

type FormFields = Record<string, string>;

const getCategory = (categoryId: string): { name: string } => {
  const categoryGroup = categoryGroupsStub[categoryId];

  if (categoryGroup) {
    return categoryGroup;
  }

  const category = categoriesStub[categoryId];

  return category;
};

const RenameCategory = (props: RenameCategoryProps) => {
  const { categories } = props;
  const { formatMessage } = useIntl();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: categories.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: getCategory(curr).name,
      }),
      {},
    ),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data);

  return (
    <Modal.Content {...props}>
      <Modal.CloseButton onPress={() => props.onClose('close-delete-category-modal')} />
      <Modal.Header>
        {formatMessage(
          { defaultMessage: 'Edit Category {count, plural, one {Name} other {Names}}' },
          { count: categories.length },
        )}
      </Modal.Header>
      <Modal.Body>
        <VStack space="2">
          {categories.map((category) => (
            <>
              <Controller
                control={control}
                name={category}
                rules={{ required: true }}
                render={({ field, formState: { defaultValues } }) => (
                  <Input defaultValue={defaultValues[category]} placeholder={defaultValues[category]} {...field} />
                )}
              />
              {errors[category] && (
                <Text fontSize="xs" color="red.400">
                  {formatMessage({ defaultMessage: 'Category name is required' })}
                </Text>
              )}
            </>
          ))}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={handleSubmit(onSubmit)}>{formatMessage({ defaultMessage: 'Update' })}</Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

export const RenameCategoryModal = ({ categories, onClose }: RenameCategoryModalProps) => {
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
          <RenameCategory categories={categories} onClose={onClose} roundedBottom="0" width="full" />
        </Slide>
      ) : (
        <RenameCategory categories={categories} onClose={onClose} />
      )}
    </Modal>
  );
};
