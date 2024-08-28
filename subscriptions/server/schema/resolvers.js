const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];

const resolvers = {
  Query: {
    user: (parent, args, context) => {
      if (!context.user) throw new Error(`No user authenticated`);
      return users.find((u) => u.id === context.user.id);
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

      const token = jwt.sign({ id: user.id, email: user.email }, "secret-word");

      return { token, user };
    },
    login: async (parent, args) => {
      const { email, password } = args.input;
      const user = users.find((u) => u.email === email);
      if (!user) throw new Error("No user found");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid password");

      const token = jwt.sign({ id: user.id, email: user.email }, "secret-word");
      return { token, user };
    },
  },
};

module.exports = resolvers;
