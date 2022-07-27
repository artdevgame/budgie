import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card, CardFooter, CardHeader } from './Card';

interface IPlaceholder {
  height?: number;
}

export default {
  title: 'Layout/Panels/Card',
  component: Card,
  argTypes: {
    footer: {
      control: { type: false },
      table: { type: { summary: '<CardFooter />' } },
    },
    header: {
      control: { type: false },
      table: { type: { summary: '<CardHeader />' } },
    },
  },
} as ComponentMeta<typeof Card>;

const Placeholder = ({ height = 48 }: IPlaceholder) => (
  <svg
    className={`border-2 border-dashed border-gray-300 rounded bg-white w-full text-gray-200 h-${height}`}
    preserveAspectRatio="none"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 200 200"
    aria-hidden="true"
  >
    <path vectorEffect="non-scaling-stroke" strokeWidth="2" d="M0 0l200 200M0 200L200 0"></path>
  </svg>
);

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <Placeholder />
  </Card>
);

export const DemoComponent = Template.bind({});
DemoComponent.storyName = 'Card';
DemoComponent.args = {};

export const DemoComponent1 = Template.bind({});
DemoComponent1.storyName = 'Card, edge-to-edge on mobile';
DemoComponent1.args = {
  isFullWidth: true,
};

export const DemoComponent2 = Template.bind({});
DemoComponent2.storyName = 'Card with header';
DemoComponent2.args = {
  header: (
    <CardHeader>
      <Placeholder height={8} />
    </CardHeader>
  ),
};

export const DemoComponent3 = Template.bind({});
DemoComponent3.storyName = 'Card with footer';
DemoComponent3.args = {
  footer: (
    <CardFooter>
      <Placeholder height={8} />
    </CardFooter>
  ),
};

export const DemoComponent4 = Template.bind({});
DemoComponent4.storyName = 'Card with header and footer';
DemoComponent4.args = {
  header: (
    <CardHeader>
      <Placeholder height={8} />
    </CardHeader>
  ),
  footer: (
    <CardFooter>
      <Placeholder height={8} />
    </CardFooter>
  ),
};

export const DemoComponent5 = Template.bind({});
DemoComponent5.storyName = 'Card with gray footer';
DemoComponent5.args = {
  footer: (
    <CardFooter isGray>
      <Placeholder height={8} />
    </CardFooter>
  ),
};

export const DemoComponent6 = Template.bind({});
DemoComponent6.storyName = 'Card with gray body';
DemoComponent6.args = {
  header: (
    <CardHeader>
      <Placeholder height={8} />
    </CardHeader>
  ),
  isGrayBody: true,
};
