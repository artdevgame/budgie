import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InitialsAvatar } from './InitialsAvatar';

export default {
  title: 'Elements/Avatars/InitialsAvatar',
  component: InitialsAvatar,
  args: {
    initials: 'MH',
  },
  // argTypes: {
  //   notificationColor: { defaultValue: Color.GRAY, control: { type: 'select', options: Color } },
  //   notificationPosition: {
  //     defaultValue: 'none',
  //     control: { type: 'select', options: TNotificationPosition },
  //   },
  //   size: { defaultValue: 5, control: { type: 'range', min: 1, max: 6 }, table: { type: { summary: 'number' } } },
  //   ...classNameModifierArgType,
  // },
} as ComponentMeta<typeof InitialsAvatar>;

const Template: ComponentStory<typeof InitialsAvatar> = (args) => <InitialsAvatar {...args} />;

export const Example1 = Template.bind({});
Example1.storyName = 'InitialsAvatar';
