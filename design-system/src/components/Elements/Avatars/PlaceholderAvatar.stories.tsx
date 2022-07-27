import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PlaceholderAvatar } from './PlaceholderAvatar';

export default {
  title: 'Elements/Avatars/PlaceholderAvatar',
  component: PlaceholderAvatar,
  // argTypes: {
  //   notificationColor: { defaultValue: Color.GRAY, control: { type: 'select', options: Color } },
  //   notificationPosition: {
  //     defaultValue: 'none',
  //     control: { type: 'select', options: TNotificationPosition },
  //   },
  //   size: { defaultValue: 5, control: { type: 'range', min: 1, max: 6 }, table: { type: { summary: 'number' } } },
  // },
} as ComponentMeta<typeof PlaceholderAvatar>;

const Template: ComponentStory<typeof PlaceholderAvatar> = (args) => <PlaceholderAvatar {...args} />;

export const Example1 = Template.bind({});
Example1.storyName = 'PlaceholderAvatar';
