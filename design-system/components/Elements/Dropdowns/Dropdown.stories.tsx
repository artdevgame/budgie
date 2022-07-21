import { View } from 'react-native';

import {
    ArchiveIcon, ArrowCircleRightIcon, DuplicateIcon, HeartIcon, PencilAltIcon, TrashIcon,
    UserAddIcon
} from '@heroicons/react/solid';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
    Dropdown, DropdownGroup, DropdownHeader, DropdownItem, IDropdownItemCallback
} from './Dropdown';

export default {
  title: 'Elements/Dropdowns/Dropdown',
  component: Dropdown,
  argTypes: {
    actuator: { control: { type: false } },
    header: { control: { type: false }, table: { type: { summary: '<DropdownHeader />' } } },
  },
  decorators: [
    (Story) => (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const itemCallback = ({ item, label }: IDropdownItemCallback) => console.log(`Pressed: ${label}`, item);

const Simple: ComponentStory<typeof Dropdown> = () => (
  <Dropdown actuator={{ type: 'button', label: 'Options' }}>
    <DropdownGroup>
      <DropdownItem label="Account Settings" onPress={itemCallback} />
      <DropdownItem label="Support" onPress={itemCallback} />
      <DropdownItem label="License" onPress={itemCallback} />
      <DropdownItem label="Sign out" onPress={itemCallback} />
    </DropdownGroup>
  </Dropdown>
);

const WithDivisions: ComponentStory<typeof Dropdown> = () => (
  <Dropdown actuator={{ type: 'button', label: 'Options' }}>
    <DropdownGroup>
      <DropdownItem label="Edit" onPress={itemCallback} />
      <DropdownItem label="Duplicate" onPress={itemCallback} />
    </DropdownGroup>
    <DropdownGroup>
      <DropdownItem label="Archive" onPress={itemCallback} />
      <DropdownItem label="Move" onPress={itemCallback} />
    </DropdownGroup>
    <DropdownGroup>
      <DropdownItem label="Share" onPress={itemCallback} />
      <DropdownItem label="Add to favourites" onPress={itemCallback} />
    </DropdownGroup>
    <DropdownGroup>
      <DropdownItem label="Delete" onPress={itemCallback} />
    </DropdownGroup>
  </Dropdown>
);

const WithIcons: ComponentStory<typeof Dropdown> = () => (
  <Dropdown actuator={{ type: 'button', label: 'Options' }}>
    <DropdownGroup>
      <DropdownItem icon={<PencilAltIcon />} label="Edit" onPress={itemCallback} />
      <DropdownItem icon={<DuplicateIcon />} label="Duplicate" onPress={itemCallback} />
    </DropdownGroup>
    <DropdownGroup>
      <DropdownItem icon={<ArchiveIcon />} label="Archive" onPress={itemCallback} />
      <DropdownItem icon={<ArrowCircleRightIcon />} label="Move" onPress={itemCallback} />
    </DropdownGroup>
    <DropdownGroup>
      <DropdownItem icon={<UserAddIcon />} label="Share" onPress={itemCallback} />
      <DropdownItem icon={<HeartIcon />} label="Add to favourites" onPress={itemCallback} />
    </DropdownGroup>
    <DropdownGroup>
      <DropdownItem icon={<TrashIcon />} label="Delete" onPress={itemCallback} />
    </DropdownGroup>
  </Dropdown>
);

const WithMenuIcon: ComponentStory<typeof Dropdown> = () => (
  <Dropdown actuator={{ type: 'minimal' }}>
    <DropdownGroup>
      <DropdownItem label="Account Settings" onPress={itemCallback} />
      <DropdownItem label="Support" onPress={itemCallback} />
      <DropdownItem label="License" onPress={itemCallback} />
      <DropdownItem label="Sign out" onPress={itemCallback} />
    </DropdownGroup>
  </Dropdown>
);

const WithHeader: ComponentStory<typeof Dropdown> = () => (
  <Dropdown
    actuator={{ type: 'button', label: 'Options' }}
    header={
      <DropdownHeader>
        <p className="text-sm">Signed in as</p>
        <p className="text-sm font-medium text-gray-900 truncate">tom@example.com</p>
      </DropdownHeader>
    }
  >
    <DropdownGroup>
      <DropdownItem label="Account Settings" onPress={itemCallback} />
      <DropdownItem label="Support" onPress={itemCallback} />
      <DropdownItem label="License" onPress={itemCallback} />
    </DropdownGroup>
    <DropdownGroup>
      <DropdownItem label="Sign out" onPress={itemCallback} />
    </DropdownGroup>
  </Dropdown>
);

export const Example1 = Simple.bind({});
Example1.storyName = 'Simple';

export const Example2 = WithDivisions.bind({});
Example2.storyName = 'With dividers';

export const Example3 = WithIcons.bind({});
Example3.storyName = 'With icons';

export const Example4 = WithMenuIcon.bind({});
Example4.storyName = 'With minimal menu icon';

export const Example5 = WithHeader.bind({});
Example5.storyName = 'With simple header';
