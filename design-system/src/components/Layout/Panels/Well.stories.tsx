import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Well } from './Well';

interface PlaceholderProps {
  height?: number;
}

export default {
  title: 'Layout/Panels/Well',
  component: Well,
} as ComponentMeta<typeof Well>;

const Placeholder = ({ height = 64 }: PlaceholderProps) => (
  <svg
    className={`border-2 border-dashed border-gray-400 rounded bg-transparent w-full text-gray-300 h-${height}`}
    preserveAspectRatio="none"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 200 200"
    aria-hidden="true"
  >
    <path vectorEffect="non-scaling-stroke" strokeWidth="2" d="M0 0l200 200M0 200L200 0"></path>
  </svg>
);

const Template: ComponentStory<typeof Well> = (args) => (
  <Well {...args}>
    <Placeholder />
  </Well>
);

export const DemoComponent = Template.bind({});
DemoComponent.storyName = 'Well on gray';
DemoComponent.args = {
  isGray: true,
};

export const DemoComponent1 = Template.bind({});
DemoComponent1.storyName = 'Well, edge-to-edge on mobile';
DemoComponent1.args = {
  isFullWidth: true,
};
