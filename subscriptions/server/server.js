const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({});

server
  .listen()
  .then(({ url }) => {
    console.log(`
        🚀 Server is running
        💻 Live at ${url}
        `);
  })
  .catch((e) => {
    console.log(`An error in starting server: ${e}`);
  });
