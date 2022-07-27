import React from 'react';

import { PlusIcon } from '@heroicons/react/solid';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton } from '../../Elements/Buttons/IconButton';
import { ButtonDivider } from './ButtonDivider';

export default {
  title: 'Layout/Dividers/ButtonDivider',
  component: ButtonDivider,
} as ComponentMeta<typeof ButtonDivider>;

const Template: ComponentStory<typeof ButtonDivider> = (args) => (
  <ButtonDivider {...args}>
    <IconButton variant="tertiary" icon={<PlusIcon />} rounded>
      Button text
    </IconButton>
  </ButtonDivider>
);

export const DemoComponent = Template.bind({});
DemoComponent.storyName = 'With button';

export const DemoComponent2 = Template.bind({});
DemoComponent2.storyName = 'With title and button';
DemoComponent2.args = {
  label: 'Projects',
};
