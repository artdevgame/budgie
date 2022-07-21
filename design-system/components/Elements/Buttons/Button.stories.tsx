import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Elements/Buttons/Button',
  component: Button,
  args: {
    children: 'Button text',
    rounded: false,
    size: 'md',
  },
  // argTypes: {
  //   variant: {
  //     control: { type: 'select', options: ['primary', 'secondary', 'tertiary'] },
  //   },
  //   size: { control: { type: 'range', min: 1, max: 5 }, table: { type: { summary: 'number' } } },
  // },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} onPress={() => console.log('Button pressed')} />
);

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  variant: 'primary',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  variant: 'secondary',
};

export const TertiaryButton = Template.bind({});
TertiaryButton.args = {
  variant: 'tertiary',
};

export const RoundedButton = Template.bind({});
RoundedButton.args = {
  variant: 'primary',
  rounded: true,
};
