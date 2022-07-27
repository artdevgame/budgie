import React from 'react';
import { View } from 'react-native';

import { CheckCircleIcon, InboxIcon } from '@heroicons/react/outline';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
    NotificationDescription, NotificationTitle, SimpleNotification
} from './SimpleNotification';

export default {
  title: 'Overlays/Notifications/SimpleNotification',
  component: SimpleNotification,
  argTypes: {
    children: { control: { type: false } },
    icon: { control: { type: false } },
  },
} as ComponentMeta<typeof SimpleNotification>;

const Template: ComponentStory<typeof SimpleNotification> = (args) => (
  <SimpleNotification {...args}>{args.children}</SimpleNotification>
);

export const DemoComponent = Template.bind({});
DemoComponent.storyName = 'SimpleNotification';
DemoComponent.args = {
  children: [
    <NotificationTitle key="title">Successfully saved!</NotificationTitle>,
    <NotificationDescription key="description">Anyone with a link can now view this file.</NotificationDescription>,
  ],
  icon: <CheckCircleIcon className="text-green-400" />,
  onClose: (notification: View) => console.log('Close notification', notification),
};

export const DemoComponent2 = Template.bind({});
DemoComponent2.storyName = 'With Actions';
DemoComponent2.args = {
  actions: [
    { label: 'Undo', onPress: () => console.log('Undo pressed') },
    { label: 'Dismiss', onPress: () => console.log('Dismiss pressed') },
  ],
  children: [
    <NotificationTitle key="title">Discussion moved</NotificationTitle>,
    <NotificationDescription key="description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.
    </NotificationDescription>,
  ],
  icon: <InboxIcon className="text-gray-400" />,
  onClose: (notification: View) => console.log('Close notification', notification),
};
