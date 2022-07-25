import React from 'react';
import { View } from 'react-native';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CondensedNotification } from './CondensedNotification';

export default {
  title: 'Overlays/Notifications/CondensedNotification',
  component: CondensedNotification,
  argTypes: {
    children: { control: { type: false } },
    icon: { control: { type: false } },
  },
} as ComponentMeta<typeof CondensedNotification>;

const Template: ComponentStory<typeof CondensedNotification> = ({ children, ...rest }) => (
  <CondensedNotification {...rest}>{children}</CondensedNotification>
);

export const DemoComponent = Template.bind({});
DemoComponent.storyName = 'CondensedNotification';
DemoComponent.args = {
  action: {
    label: 'Undo',
    onPress: () => console.log('Undo pressed'),
  },
  children: 'Discussion archived',
  onClose: (notification: View) => console.log('Close notification', notification),
};
