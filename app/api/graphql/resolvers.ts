export const resolvers = {
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createInvoice: async (_: any, { input }: any, context: any) => {
      try {
        const newInvoice = await context.dataSources.invoices.createInvoice({
          input,
        });
        return newInvoice;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to create invoice: ${error.message}`);
        }
        return null;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteInvoice: async (_: any, { id }: any, context: any) => {
      try {
        await context.dataSources.invoices.deleteInvoice({ id });
        return true;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to delete invoice: ${error.message}`);
        }
        return null;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateInvoice: async (_: any, { input }: any, context: any) => {
      try {
        return await context.dataSources.invoices.updateInvoice({ input });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to update invoice: ${error.message}`);
        }
        return null;
      }
    },
  },
  Query: {
    invoices: async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _: any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      __: any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      context: { dataSources: { invoices: { getAllInvoices: () => any } } },
    ) => {
      try {
        return await context.dataSources.invoices.getAllInvoices();
      } catch (error) {
        console.error('Error fetching invoices:', error);
        if (error instanceof Error) {
          throw new Error(`Failed to fetch invoices: ${error.message}`);
        }
        return null;
      }
    },
  },
};
