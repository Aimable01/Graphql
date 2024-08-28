import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    user: User
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input UserSignupInput {
    username: String!
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  type Mutation {
    signup(input: UserSignupInput!): AuthPayload
    login(input: UserSigninInput!): AuthPayload
  }
`;
