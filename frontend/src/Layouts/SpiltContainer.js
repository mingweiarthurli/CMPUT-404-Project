import React, { useState, useEffect } from "react";
import { Container, Grid, List } from "semantic-ui-react";
import axios from "axios";

const SplitContainer = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url); //get data from api's url
        setData(result.data); //
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <Container textAlign="center">
      <Grid column={2} divided>
        <Grid.Row>
          <Grid.Column>
            <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            <button
              type="button"
              onClick={() =>
                setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
              }
            >
              Search
            </button>
            {isError && <div>Something went wrong ...</div>}
            {isLoading ? (
              <div>Loading ...</div>
            ) : (
              <ul>
                {data.hits.map(item => (
                  <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default SplitContainer;
