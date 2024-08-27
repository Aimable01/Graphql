const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    user: User
    rooms: [Room!]!
    messages(room: String!): [Message!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  ## subscriptions
  type Message {
    id: ID!
    content: String!
    sender: String!
    room: String!
  }

  type Room {
    name: String!
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

  input MessageInput {
    content: String!
    sender: String!
    room: String!
  }

  type Mutation {
    signup(input: UserSignupInput!): AuthPayload
    login(input: UserSigninInput!): AuthPayload
    sendMessage(input: MessageInput!): Message!
    createRoom(name: String!): Room!
  }

  type Subscription {
    messageSent(room: String!): Message!
  }
`;

module.exports = typeDefs;
