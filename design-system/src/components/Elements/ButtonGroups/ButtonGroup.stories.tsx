import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { BookmarkIcon } from '@heroicons/react/solid';
import { Meta, Story } from '@storybook/react';

import { Button } from '../Buttons/Button';
import { IconButton } from '../Buttons/IconButton';
import {
    Dropdown, DropdownGroup, DropdownItem, IDropdownItemCallback
} from '../Dropdowns/Dropdown';
import { ButtonGroup, IButtonGroup } from './ButtonGroup';

export default {
  title: 'Elements/ButtonGroups/ButtonGroup',
  component: ButtonGroup,
  // argTypes: {
  //   buttons: {
  //     control: { type: false },
  //     table: { type: { summary: '<Button />[]' } },
  //   },
  //   size: { control: { type: 'range', min: 1, max: 4 }, table: { type: { summary: 'number' } } },
  // },
} as Meta;

const Template: Story<IButtonGroup> = (args) => (
  <ButtonGroup size={args.size}>
    <Button onPress={() => console.log('Pressed: Years')}>Years</Button>
    <Button onPress={() => console.log('Pressed: Months')}>Months</Button>
    <Button onPress={() => console.log('Pressed: Days')}>Days</Button>
  </ButtonGroup>
);

const Template2: Story<IButtonGroup> = (args) => (
  <ButtonGroup size={args.size}>
    <IconButton icon={<ChevronLeftIcon />} onPress={() => console.log('Pressed: Left button')} />
    <IconButton icon={<ChevronRightIcon />} onPress={() => console.log('Pressed: Right button')} />
  </ButtonGroup>
);

const Template3: Story<IButtonGroup> = (args) => (
  <ButtonGroup size={args.size}>
    <IconButton icon={<BookmarkIcon />} onPress={() => console.log('Pressed: Bookmark')}>
      Bookmark
    </IconButton>
    <Button onPress={() => console.log('Pressed: Stat')}>12k</Button>
  </ButtonGroup>
);

const onDropdownItemPressed = ({ item, label }: IDropdownItemCallback) => console.log(`Pressed: ${label}`, item);

const Template4: Story<IButtonGroup> = (args) => (
  <ButtonGroup size={args.size}>
    <Button onPress={() => console.log('Pressed: Save changes')}>Save changes</Button>
    <Dropdown>
      <DropdownGroup>
        <DropdownItem label="Save and schedule" onPress={onDropdownItemPressed} />
        <DropdownItem label="Save and publish" onPress={onDropdownItemPressed} />
        <DropdownItem label="Export PDF" onPress={onDropdownItemPressed} />
      </DropdownGroup>
    </Dropdown>
  </ButtonGroup>
);

export const Example1 = Template.bind({});
Example1.storyName = 'Basic';

export const Example2 = Template2.bind({});
Example2.storyName = 'Icon only';

export const Example3 = Template3.bind({});
Example3.storyName = 'With stat';

export const Example4 = Template4.bind({});
Example4.storyName = 'With dropdown';
Example4.decorators = [
  (Story) => (
    <div style={{ textAlign: 'center' }}>
      <Story />
    </div>
  ),
];
