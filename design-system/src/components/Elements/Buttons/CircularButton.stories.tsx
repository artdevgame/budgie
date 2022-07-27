import { CheckIcon, PlusIcon } from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react';

import { CircularButton, ICircularButton } from './CircularButton';

const iconMap = {
  PlusIcon: <PlusIcon />,
  CheckIcon: <CheckIcon />,
};

type IconMapKey = keyof typeof iconMap;

export default {
  title: 'Elements/Buttons/Circular',
  component: CircularButton,
  args: {
    children: 'Button text',
  },
  // argTypes: {
  //   icon: { control: { type: 'select', options: Object.keys(iconMap) } },
  //   size: { control: { type: 'range', min: 1, max: 5 }, table: { type: { summary: 'number' } } },
  // },
} as Meta;

const Template: Story<ICircularButton> = ({ icon, size, ...rest }) => {
  const key = icon as IconMapKey;
  const selectedIcon = iconMap[key];

  return <CircularButton {...rest} size={size} icon={selectedIcon} onPress={() => console.log('Button pressed')} />;
};

export const Circular = Template.bind({});
Circular.args = {
  icon: 'PlusIcon',
  size: 'md',
};
