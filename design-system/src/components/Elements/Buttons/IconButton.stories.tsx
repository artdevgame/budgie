import { CheckIcon } from '@heroicons/react/outline';
import { MailIcon } from '@heroicons/react/solid';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton } from './IconButton';

const iconMap = {
  MailIcon: <MailIcon />,
  CheckIcon: <CheckIcon />,
};

export default {
  title: 'Elements/Buttons/Icon',
  component: IconButton,
  args: {
    iconPosition: 'before',
    size: 'md',
  },
  // argTypes: {
  //   buttonType: {
  //     control: { type: 'select', options: ['primary', 'secondary', 'tertiary'] },
  //   },
  //   icon: { control: { type: 'select', options: Object.keys(iconMap) } },
  //   iconPosition: { control: { type: 'select', options: ['before', 'after'] } },
  //   size: { control: { type: 'range', min: 1, max: 4 }, table: { type: { summary: 'number' } } },
  // },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = ({ icon, iconPosition, size, ...rest }) => {
  const Icon = typeof icon === 'string' ? iconMap[icon] : icon;
  return (
    <IconButton
      {...rest}
      size={size}
      icon={Icon}
      iconPosition={iconPosition}
      onPress={() => console.log('Button pressed')}
    >
      Button text
    </IconButton>
  );
};

export const Icon = Template.bind({});
Icon.args = {
  icon: iconMap['MailIcon'],
};
