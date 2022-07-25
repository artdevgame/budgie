import React from 'react';

import { PlusIcon } from '@heroicons/react/solid';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconDivider } from './IconDivider';

export default {
  title: 'Layout/Dividers/IconDivider',
  component: IconDivider,
  // argTypes: {
  //   placement: { control: { type: 'select', options: [] } },
  // },
} as ComponentMeta<typeof IconDivider>;

const Template: ComponentStory<typeof IconDivider> = (args) => (
  <IconDivider {...args}>
    <PlusIcon />
  </IconDivider>
);

export const DemoComponent = Template.bind({});
DemoComponent.storyName = 'IconDivider';
