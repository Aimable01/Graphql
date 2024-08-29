import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PubSub } from "graphql-subscriptions";
import { subscribe } from "graphql";

const users = [];
let currentNumber = 0;

const pubSub = new PubSub();

export const resolvers = {
  Query: {
    user: (parent, args, context) => {
      if (!context.user) throw new Error(`No user authenticated`);
      return users.find((u) => u.id === context.user.id);
    },
    currentNumber() {
      return currentNumber;
    },
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => pubSub.asyncIterator("NUMBER_INCREMENTED"),
    },
  },
  Mutation: {
    signup: async (parent, args) => {
      const { username, email, password } = args.input;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
      };

      users.push(user);

      const token = jwt.sign(
        { id: user.id, email: user.email },
        "secret-word",
        { expiresIn: "1h" }
      );

      return { token, user };
    },
    login: async (parent, args) => {
      const { email, password } = args.input;
      const user = users.find((u) => u.email === email);
      if (!user) throw new Error("No user found");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid password");

      const token = jwt.sign(
        { id: user.id, email: user.email },
        "secret-word",
        { expiresIn: "1h" }
      );
      return { token, user };
    },
  },
};

// ----- increment number function
function incrementNumber() {
  currentNumber += 1;
  pubSub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 10000);
}

incrementNumber();
