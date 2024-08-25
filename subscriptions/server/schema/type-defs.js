const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    user: User
  }

  type UserSignupInput {
    username: String!
    email: String!
    password: String!
  }

  type UserSigninInput {
    email: String!
    password: String!
  }

  type Mutation {
    signup(input: UserInput!): String!
    login(input: UserSigninInput!): String!
  }
`;

module.exports = { typeDefs };
