import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AvatarStack } from './AvatarStack';
import { ImageAvatar } from './ImageAvatar';

export default {
  title: 'Elements/Avatars/AvatarStack',
  component: AvatarStack,
  // argTypes: {
  //   avatars: {
  //     control: { type: false },
  //     table: { type: { summary: '(<ImageAvatar /> | <InitialsAvatar /> | <PlaceholderAvatar />)[]' } },
  //   },
  //   size: { defaultValue: 2, control: { type: 'range', min: 1, max: 3 }, table: { type: { summary: 'number' } } },
  //   stackOrder: { defaultValue: StackOrder.BOTTOM_TO_TOP, control: { type: 'select', options: StackOrder } },
  // },
} as ComponentMeta<typeof AvatarStack>;

const Template: ComponentStory<typeof AvatarStack> = (args) => <AvatarStack {...args} />;

export const Example1 = Template.bind({});
Example1.storyName = 'AvatarStack';
Example1.args = {
  avatars: [
    <ImageAvatar
      key="avatar-1"
      imageUrl="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    />,
    <ImageAvatar
      key="avatar-2"
      imageUrl="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    />,
    <ImageAvatar
      key="avatar-3"
      imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    />,
    <ImageAvatar
      key="avatar-4"
      imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    />,
  ],
};
