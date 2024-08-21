import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetMovies {
    movies {
      id
      name
      yearOfPublication
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query GetMovie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      age
      nationality
    }
  }
`;

const UPDATE_USERNAME_MUTATION = gql`
  mutation UpdateUsername($input: UpdateUsernameInput!) {
    updateUsername(input: $input) {
      id
      username
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      name
      id
    }
  }
`;

export default function DisplayData() {
  const [movieSearch, setMovieSearch] = useState("");

  // create user states
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  // update user states
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [id, setId] = useState(0);
  const [updateUsername] = useMutation(UPDATE_USERNAME_MUTATION);

  // delete user states
  const [deleteid, setDeleteid] = useState(0);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: MovieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) return <h1>data loading...</h1>;
  if (data) console.log(data);
  if (error) console.log(`An error ${error}`);

  let list = data.users;

  return (
    <div>
      <h1>Users</h1>
      <div>
        {data &&
          list.map((user) => (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Age: {user.age}</p>
              <p>Username: {user.username}</p>
            </div>
          ))}
      </div>

      <h1>Movies</h1>
      {MovieData &&
        MovieData.movies.map((m) => (
          <div key={m.id}>
            <p>{m.name}</p>
          </div>
        ))}

      <h1>Search</h1>
      <div>
        <input
          type="text"
          placeholder="movie name..."
          onChange={(e) => setMovieSearch(e.target.value)}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearch,
              },
            })
          }
        >
          Fetch data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <p>name: {movieSearchedData.movie.name}</p>
              <p>year: {movieSearchedData.movie.yearOfPublication}</p>
            </div>
          )}
          {movieError && <h1>There was an error fetching the data</h1>}
        </div>
      </div>

      <h1>Create User</h1>
      <div>
        <button
          onClick={() => {
            createUser({
              variables: { input: { name, username, age, nationality } },
            });
            refetch();
          }}
        >
          Create User
        </button>
        <input
          type="text"
          placeholder="name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="age..."
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="nationality..."
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
      </div>

      <h1>Update Username</h1>
      <div>
        <input
          type="number"
          placeholder="User ID..."
          onChange={(e) => setId(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="New Username..."
          onChange={(e) => setUpdatedUsername(e.target.value)}
        />
        <button
          onClick={() => {
            updateUsername({
              variables: {
                input: {
                  id: id,
                  newUsername: updatedUsername,
                },
              },
            });
            refetch();
          }}
        >
          Update Username
        </button>
      </div>

      <h1>Delete user</h1>
      <div>
        <input
          type="number"
          onChange={(e) => setDeleteid(Number(e.target.value))}
        />
        <button
          onClick={() => {
            deleteUser({ variables: { deleteUserId: deleteid } });
            refetch();
          }}
        >
          Delte
        </button>
      </div>
    </div>
  );
}
