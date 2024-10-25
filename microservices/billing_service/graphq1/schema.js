import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Billing {
    id: ID!
    userId: ID!
    amount: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getBillingById(id: ID!): Billing
    getAllBillings: [Billing]
  }

  type Mutation {
    createBilling(userId: ID!, amount: Float!, status: String!): Billing
    updateBillingStatus(id: ID!, status: String!): Billing
  }
`;

export default typeDefs;
