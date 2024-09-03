import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Invoice {
    id: ID!
    billed: Float!
    businessAddress: String!
    businessCity: String!
    businessCountry: String!
    businessEmail: String!
    businessName: String!
    businessZip: String!
    clientAddress: String!
    clientCity: String!
    clientCountry: String!
    clientEmail: String!
    clientName: String!
    clientZip: String!
    invoiceDate: String!
    paymentDue: String!
    paymentTerms: String!
    projectName: String!
    status: String!
  }

  input NewInvoiceInput {
    billed: Float!
    businessAddress: String!
    businessCity: String!
    businessCountry: String!
    businessEmail: String!
    businessName: String!
    businessZip: String!
    clientAddress: String!
    clientCity: String!
    clientCountry: String!
    clientEmail: String!
    clientName: String!
    clientZip: String!
    invoiceDate: String!
    paymentDue: String!
    paymentTerms: String!
    projectName: String!
    status: String!
  }

  input UpdateInvoiceInput {
    id: ID!
    billed: Float
    businessAddress: String
    businessCity: String
    businessCountry: String
    businessEmail: String
    businessName: String
    businessZip: String
    clientAddress: String
    clientCity: String
    clientCountry: String
    clientEmail: String
    clientName: String
    clientZip: String
    invoiceDate: String
    paymentDue: String
    paymentTerms: String
    projectName: String
    status: String
  }

  type Query {
    invoices: [Invoice]
  }

  type Mutation {
    createInvoice(input: NewInvoiceInput): Invoice!
    updateInvoice(id: ID!, input: UpdateInvoiceInput): Invoice!
    deleteInvoice(id: ID!): Invoice!
  }
`;
