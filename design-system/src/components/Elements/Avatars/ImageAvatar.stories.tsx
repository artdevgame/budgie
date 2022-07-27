import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ImageAvatar } from './ImageAvatar';

export default {
  title: 'Elements/Avatars/ImageAvatar',
  component: ImageAvatar,
  args: {
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // argTypes: {
  //   notificationColor: { defaultValue: 'gray', control: { type: 'select', options: Object.values(color) } },
  //   notificationPosition: {
  //     defaultValue: 'none',
  //     control: { type: 'select', options: Object.values(notificationPosition) },
  //   },
  //   size: { defaultValue: 5, control: { type: 'range', min: 1, max: 6 }, table: { type: { summary: 'number' } } },
  // },
} as ComponentMeta<typeof ImageAvatar>;

const Template: ComponentStory<typeof ImageAvatar> = (args) => <ImageAvatar {...args} />;

export const Example1 = Template.bind({});
Example1.storyName = 'ImageAvatar';
