import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { members } from '../../../../stubs/members';
import { Text } from '../../Elements/Typography/Text';
import { Checkbox } from './Checkbox';
import { CheckboxList } from './CheckboxList';

export default {
  title: 'Forms/Checkboxes/CheckboxList',
  component: CheckboxList,
} as ComponentMeta<typeof CheckboxList>;

const Template: ComponentStory<typeof CheckboxList> = (args) => {
  const [selected, setSelected] = React.useState<string[]>(['candidates']);
  return (
    <CheckboxList {...args} onChange={setSelected} selected={selected}>
      <Checkbox value="comments">
        <Text className="font-medium text-gray-700 text-sm">Comments</Text>
        <Text className="text-gray-500 text-sm">Get notified when someones posts a comment on a posting.</Text>
      </Checkbox>

      <Checkbox value="candidates" disabled>
        <Text className="font-medium text-gray-700 text-sm">Candidates</Text>
        <Text className="text-gray-500 text-sm">Get notified when a candidate applies for a job.</Text>
      </Checkbox>

      <Checkbox value="offers">
        <Text className="font-medium text-gray-700 text-sm">Offers</Text>
        <Text className="text-gray-500 text-sm">Get notified when a candidate accepts or rejects an offer.</Text>
      </Checkbox>
    </CheckboxList>
  );
};

const TemplateWithInlineDescription: ComponentStory<typeof CheckboxList> = (args) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <CheckboxList {...args} onChange={setSelected} selected={selected}>
      <Checkbox value="comments">
        <Text className="font-medium text-gray-700 text-sm">
          New comments <Text className="font-normal text-gray-500 text-sm">so you always know what's happening</Text>
        </Text>
      </Checkbox>

      <Checkbox value="candidates">
        <Text className="font-medium text-gray-700 text-sm">
          New candidates <Text className="font-normal text-gray-500 text-sm">who apply for any open postings.</Text>
        </Text>
      </Checkbox>

      <Checkbox value="offers">
        <Text className="font-medium text-gray-700 text-sm">
          Offers{' '}
          <Text className="font-normal text-gray-500 text-sm">when they are accepted or rejected by candidates.</Text>
        </Text>
      </Checkbox>
    </CheckboxList>
  );
};

const TemplateWithCheckboxOnRight: ComponentStory<typeof CheckboxList> = (args) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <CheckboxList
      {...args}
      checkboxPlacement="right"
      className="max-w-[600px]"
      onChange={setSelected}
      selected={selected}
    >
      <Checkbox value="comments">
        <Text className="font-medium text-gray-700 text-sm">Comments</Text>
        <Text className="text-gray-500 text-sm">Get notified when someones posts a comment on a posting.</Text>
      </Checkbox>

      <Checkbox value="candidates">
        <Text className="font-medium text-gray-700 text-sm">Candidates</Text>
        <Text className="text-gray-500 text-sm">Get notified when a candidate applies for a job.</Text>
      </Checkbox>

      <Checkbox value="offers">
        <Text className="font-medium text-gray-700 text-sm">Offers</Text>
        <Text className="text-gray-500 text-sm">Get notified when a candidate accepts or rejects an offer.</Text>
      </Checkbox>
    </CheckboxList>
  );
};

const TemplateSimple: ComponentStory<typeof CheckboxList> = (args) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <CheckboxList
      {...args}
      checkboxPlacement="right"
      className="max-w-[600px]"
      onChange={setSelected}
      selected={selected}
    >
      {members.map((member) => (
        <Checkbox value={member.name}>
          <Text className="font-medium text-gray-700 select-none">{member.name}</Text>
        </Checkbox>
      ))}
    </CheckboxList>
  );
};

export const Default = Template.bind({});

export const WithInlineDescription = TemplateWithInlineDescription.bind({});

export const WithCheckboxOnRight = TemplateWithCheckboxOnRight.bind({});

export const WithSimple = TemplateSimple.bind({});
