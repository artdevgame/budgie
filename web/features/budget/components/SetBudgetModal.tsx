import { categoriesStub } from 'features/common/stubs/categories';
import {
    Button, HStack, IModalProps, Input, Modal, Slide, Text, useBreakpointValue
} from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ModalContextType } from 'react-modal-hook';

interface FormFields {
  amount: string;
}

interface SetBudgetModalProps {
  category: string;
  onClose: ModalContextType['hideModal'];
}

type SetBudgetProps = InterfaceBoxProps<IModalProps> & SetBudgetModalProps;

const getBudgetForCategory = (category: string) => {
  const { name } = categoriesStub[category];

  return {
    category: { id: category, name },
    amount: 0,
  };
};

const SetBudget = (props: SetBudgetProps) => {
  const { formatMessage } = useIntl();
  const budget = getBudgetForCategory(props.category);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      amount: budget.amount.toFixed(2),
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data);

  return (
    <Modal.Content {...props}>
      <Modal.CloseButton onPress={() => props.onClose('close-delete-category-modal')} />
      <Modal.Header>{formatMessage({ defaultMessage: 'Set Budget' })}</Modal.Header>
      <Modal.Body>
        <HStack justifyContent="space-between" alignItems="center">
          <Text numberOfLines={1}>{budget.category.name}</Text>

          <Controller
            control={control}
            name="amount"
            rules={{ pattern: /^[0-9.+-]+$/ }}
            render={({ field }) => (
              <HStack flexBasis="40%" justifyContent="flex-end" alignItems="center" space="1">
                <Text>&pound;</Text>
                <Input
                  keyboardType="numbers-and-punctuation"
                  width="full"
                  maxW="24"
                  placeholder="0.00"
                  textAlign="right"
                  {...field}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              </HStack>
            )}
          />
        </HStack>
        {errors.amount && (
          <Text fontSize="xs" color="red.400" mt="2">
            {formatMessage({ defaultMessage: 'Numbers only' })}
          </Text>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button>{formatMessage({ defaultMessage: 'Update' })}</Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

export const SetBudgetModal = ({ category, onClose }: SetBudgetModalProps) => {
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
          <SetBudget category={category} onClose={onClose} roundedBottom="0" width="full" />
        </Slide>
      ) : (
        <SetBudget category={category} onClose={onClose} />
      )}
    </Modal>
  );
};
