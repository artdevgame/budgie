import { ComponentMeta, ComponentStory } from '@storybook/react';

import { colors, RemovableBadge } from './RemovableBadge';

export default {
  title: 'Elements/Badges/Removable',
  component: RemovableBadge,
  args: {
    color: 'indigo',
  },
  argTypes: {
    color: { control: { type: 'select', options: colors }, table: { type: { summary: 'number' } } },
  },
} as ComponentMeta<typeof RemovableBadge>;

const Template: ComponentStory<typeof RemovableBadge> = (args) => (
  <RemovableBadge {...args} onRemove={(badge) => console.log('Remove badge', badge)}>
    Badge
  </RemovableBadge>
);

export const Removable = Template.bind({});
