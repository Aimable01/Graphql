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

export default function DisplayData() {
  const [movieSearch, setMovieSearch] = useState("");

  // create user states
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [createUser] = useMutation(CREATE_USER_MUTATION);

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
              <p>username: {user.username}</p>
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

      <h1>Create user</h1>
      <div>
        <button
          onClick={() => {
            createUser({
              variables: { input: { name, username, age, nationality } },
            });
            refetch();
          }}
        >
          Create user
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
    </div>
  );
}
