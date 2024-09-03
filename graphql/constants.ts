import { gql } from '@apollo/client';

export const FETCH_INVOICES = gql`
  query fetchInvoices {
    invoices {
      billed
      businessAddress
      businessCity
      businessCountry
      businessEmail
      businessName
      businessZip
      clientAddress
      clientCity
      clientCountry
      clientEmail
      clientName
      clientZip
      invoiceDate
      paymentDue
      paymentTerms
      projectName
      status
    }
  }
`;
