import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LabelDivider } from './LabelDivider';

export default {
  title: 'Layout/Dividers/LabelDivider',
  component: LabelDivider,
  args: {
    placement: 'justify-center',
  },
  argTypes: {
    // placement: { control: { type: 'select', options: DividerChildPlacement } },
    // size: { control: { type: 'range', min: 1, max: 2 } },
  },
} as ComponentMeta<typeof LabelDivider>;

const Template: ComponentStory<typeof LabelDivider> = (args) => <LabelDivider {...args}>Continue</LabelDivider>;

export const DemoComponent = Template.bind({});
DemoComponent.storyName = 'LabelDivider';
