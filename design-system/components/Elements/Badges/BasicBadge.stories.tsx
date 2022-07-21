import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BasicBadge, colors } from './BasicBadge';

export default {
  title: 'Elements/Badges/Basic',
  component: BasicBadge,
  args: {
    color: 'indigo',
  },
  argTypes: {
    color: { control: { type: 'select', options: colors }, table: { type: { summary: 'number' } } },
  },
} as ComponentMeta<typeof BasicBadge>;

const Template: ComponentStory<typeof BasicBadge> = (args) => <BasicBadge {...args}>Badge</BasicBadge>;

export const Basic = Template.bind({});
