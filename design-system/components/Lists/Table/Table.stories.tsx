import { styled } from 'nativewind';
import { Text as NativeText } from 'react-native';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { transactions } from '../../../stubs/transactions';
import { Cell } from './Cell';
import { Row } from './Row';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

export default {
  title: 'Components/Lists/Table',
  args: {
    condensed: false,
    striped: false,
  },
} as ComponentMeta<typeof Table>;

const columns = {
  id: { width: 'min(12%, 120px)' },
  company: { width: 'min(12%, 120px)' },
  share: { width: 'min(12%, 80px)' },
  commission: { width: 'min(12%, 120px)' },
  price: { width: 'min(12%, 120px)' },
  quantity: { width: 'min(12%, 120px)' },
  net: { width: 'min(12%, 120px)' },
};

const Text = styled(NativeText);

const Template: ComponentStory<typeof Table> = (args) => (
  <Table {...args} columns={columns} style={{ width: 'min(1000px, 100%)' }}>
    <TableHead>
      <Row disabled>
        <Cell columnId="id" variant="th">
          Transaction ID
        </Cell>
        <Cell columnId="company" variant="th">
          Company
        </Cell>
        <Cell columnId="share" variant="th">
          Share
        </Cell>
        <Cell columnId="commission" variant="th">
          Commission
        </Cell>
        <Cell columnId="price" variant="th">
          Price
        </Cell>
        <Cell columnId="quantity" variant="th">
          Quantity
        </Cell>
        <Cell columnId="net" variant="th">
          Net amount
        </Cell>
        <Cell variant="th">
          <Text className="sr-only">Edit</Text>
        </Cell>
      </Row>
    </TableHead>
    <TableBody>
      {transactions.map((transaction, index) => (
        <Row
          key={`${index}:${transaction.id}`}
          onPress={({ nativeEvent: target }) => console.log('Transaction row pressed', transaction, target, { index })}
        >
          <Cell columnId="id" variant="td">
            {transaction.id}
          </Cell>
          <Cell columnId="company" variant="td">
            {transaction.company}
          </Cell>
          <Cell columnId="share" variant="td">
            {transaction.share}
          </Cell>
          <Cell columnId="commission" variant="td">
            {transaction.commission}
          </Cell>
          <Cell columnId="price" variant="td">
            {transaction.price}
          </Cell>
          <Cell columnId="quantity" variant="td">
            {transaction.quantity}
          </Cell>
          <Cell columnId="net" variant="td">
            {transaction.netAmount}
          </Cell>
          <Cell variant="td" className="text-right font-medium pr-4 md:pr-6" onPress={(ev) => ev.preventDefault()}>
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Edit<Text className="sr-only">, {transaction.id}</Text>
            </a>
          </Cell>
        </Row>
      ))}
    </TableBody>
  </Table>
);

export const Default = Template.bind({});

export const Condensed = Template.bind({});
Condensed.args = { condensed: true };

export const Striped = Template.bind({});
Striped.args = { striped: true };
