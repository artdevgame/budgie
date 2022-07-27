import React from 'react';

import { AnnotationIcon, PaperClipIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Meta, Story } from '@storybook/react';

import { ButtonGroup } from '../../Elements/ButtonGroups/ButtonGroup';
import { IconButton } from '../../Elements/Buttons/IconButton';
import { ToolbarDivider, ToolbarDividerProps } from './ToolbarDivider';

export default {
  title: 'Layout/Dividers/ToolbarDivider',
  component: ToolbarDivider,
} as Meta;

const Template: Story<ToolbarDividerProps> = (args) => (
  <ToolbarDivider {...args}>
    <ButtonGroup size="md">
      <IconButton icon={<PencilIcon />} onPress={() => console.log('Pressed: Edit')} />
      <IconButton icon={<PaperClipIcon />} onPress={() => console.log('Pressed: Attachment')} />
      <IconButton icon={<AnnotationIcon />} onPress={() => console.log('Pressed: Annotate')} />
      <IconButton icon={<TrashIcon />} onPress={() => console.log('Pressed: Delete')} />
    </ButtonGroup>
  </ToolbarDivider>
);

export const DemoComponent = Template.bind({});
DemoComponent.storyName = 'ToolbarDivider';
