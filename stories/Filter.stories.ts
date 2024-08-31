import type { Meta, StoryObj } from '@storybook/react';
import FilterBy from '@/components/Filter';

const meta = {
  component: FilterBy,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Invoicing App/Filter Button',
} satisfies Meta<typeof FilterBy>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filter: Story = {};
