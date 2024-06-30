import React from "react";
import { Layout } from "../components";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";

import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";

const TRACKS = gql(`
  query GetTracks {
  tracksForHome{
    id
    title
    thumbnail
    length
    modulesCount
    author {
      id
      name
      photo
    }
  }
}
  `);

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { error, loading, data } = useQuery(TRACKS);
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <Layout grid>
      <QueryResult loading={loading} error={error} data={data}>
        {data?.tracksForHome?.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
