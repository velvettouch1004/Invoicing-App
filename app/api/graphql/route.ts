import { startServerAndCreateNextHandler } from '@as-integrations/next';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import Invoices from './dataSources';
import InvoiceModel from './models/Invoice';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

const connectToDb = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      // eslint-disable-next-line no-console
      console.log('Connected to database successfully');
    }
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
};

connectToDb();

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

// @ts-expect-error resolve type mismatch
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    dataSources: {
      // @ts-expect-error resolve type mismatch
      invoices: new Invoices({ modelOrCollection: InvoiceModel }),
    },
    req,
    res,
  }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
