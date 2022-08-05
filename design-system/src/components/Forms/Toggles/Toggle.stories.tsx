import React from 'react';

import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { useArgs } from '@storybook/addons';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text } from '../../Elements/Typography/Text';
import { Toggle } from './Toggle';
import ContentElements, { ToggleContent } from './ToggleContent';

export default {
  title: 'Forms/Toggles/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = ({ enabled, ...args }) => {
  const [, updateArgs] = useArgs();

  const handleChange = (enabled: boolean) => {
    updateArgs({ enabled });
  };

  return <Toggle {...args} enabled={enabled} onChange={handleChange} />;
};

const TemplateWithLeftLabelAndDescription: ComponentStory<typeof Toggle> = ({ enabled, ...args }) => {
  const [, updateArgs] = useArgs();

  const handleChange = (enabled: boolean) => {
    updateArgs({ enabled });
  };

  return (
    <Toggle {...args} enabled={enabled} onChange={handleChange}>
      <ToggleContent className="max-w-prose" placement="left">
        <ContentElements.Label passive>Available to hire</ContentElements.Label>
        <ContentElements.Description>
          Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
        </ContentElements.Description>
      </ToggleContent>
    </Toggle>
  );
};

const TemplateWithRightLabel: ComponentStory<typeof Toggle> = ({ enabled, ...args }) => {
  const [, updateArgs] = useArgs();

  const handleChange = (enabled: boolean) => {
    updateArgs({ enabled });
  };

  return (
    <Toggle {...args} enabled={enabled} onChange={handleChange}>
      <ToggleContent placement="right">
        <Text className="text-sm font-medium text-gray-900">Annual billing </Text>
        <Text className="text-sm text-gray-500">(Save 10%)</Text>
      </ToggleContent>
    </Toggle>
  );
};

export const Default = Template.bind({});

export const Short = Template.bind({});
Short.args = {
  variant: 'short',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  iconDisabled: <XIcon />,
  iconEnabled: <CheckIcon className="text-bold" />,
};

export const WithLeftLabelAndDescription = TemplateWithLeftLabelAndDescription.bind({});

export const WithRightLabel = TemplateWithRightLabel.bind({});
