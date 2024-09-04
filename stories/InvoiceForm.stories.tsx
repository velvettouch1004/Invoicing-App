import type { Meta, StoryObj } from '@storybook/react';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';

const meta = {
  component: InvoiceForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Invoicing App/Invoice Form',
} satisfies Meta<typeof InvoiceForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InvoiceFormComponent: Story = {
  args: {
    initialValues: {
      businessAddress: '',
      businessCity: '',
      businessCountry: '',
      businessEmail: '',
      businessName: '',
      businessZip: '',
      clientAddress: '',
      clientCity: '',
      clientCountry: '',
      clientEmail: '',
      clientName: '',
      clientZip: '',
      invoiceDate: new Date(),
      paymentDue: '',
      paymentTerms: '',
      projectName: '',
      status: '',
    },
    isEditing: false,
    onSubmit: (data) => {
      /* eslint-disable-next-line no-console */
      console.log(data);
    },
  },
};
