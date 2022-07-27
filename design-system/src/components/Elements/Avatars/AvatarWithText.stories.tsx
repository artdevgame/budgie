import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AvatarWithText } from './AvatarWithText';
import { ImageAvatar } from './ImageAvatar';

export default {
  title: 'Elements/Avatars/AvatarWithText',
  component: AvatarWithText,
  args: {
    avatar: (
      <ImageAvatar
        imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        size="xl"
      />
    ),
    name: 'Tom Cook',
  },
  // argTypes: {
  //   avatar: {
  //     control: { type: false },
  //     table: { type: { summary: '(<ImageAvatar /> | <InitialsAvatar /> | <PlaceholderAvatar />)[]' } },
  //   },
  // },
} as ComponentMeta<typeof AvatarWithText>;

const Template: ComponentStory<typeof AvatarWithText> = (args) => <AvatarWithText {...args} />;

export const Example1 = Template.bind({});
Example1.storyName = 'AvatarWithText';
Example1.args = {
  onPress: ({ name }) => console.log(`Avatar pressed, ${name}`),
};
