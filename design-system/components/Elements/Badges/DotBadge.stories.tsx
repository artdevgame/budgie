import { ComponentMeta, ComponentStory } from '@storybook/react';

import { colors, DotBadge } from './DotBadge';

export default {
  title: 'Elements/Badges/Dot',
  component: DotBadge,
  args: {
    color: 'indigo',
  },
  argTypes: {
    color: { control: { type: 'select', options: colors }, table: { type: { summary: 'number' } } },
  },
} as ComponentMeta<typeof DotBadge>;

const Template: ComponentStory<typeof DotBadge> = (args) => <DotBadge {...args}>Badge</DotBadge>;

export const Dot = Template.bind({});
