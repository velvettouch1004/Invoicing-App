import type { Meta, StoryObj } from '@storybook/react';
import SortInvoices from '@/components/Sort';

const meta = {
  component: SortInvoices,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Invoicing App/Sort Button',
} satisfies Meta<typeof SortInvoices>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sort: Story = {};
