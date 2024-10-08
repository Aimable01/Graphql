const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    // user resolvers
    users: (parent, args, context) => {
      console.log(context);
      return UserList;
    },
    user: (parent, args) => {
      const id = Number(args.id);
      const user = _.find(UserList, { id });
      return user;
    },

    // movie resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
    favouriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((u) => {
        if (u.id === Number(id)) {
          u.username = newUsername;
          userUpdated = u;
        }
      });
      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
