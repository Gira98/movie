import React, { useState, useEffect } from "react";
import { Flex, Pagination, Alert } from "antd";
import MovieList from "../movie-list/movie-list";
import MovieService from "../../services/movie-service";

const res = new MovieService();

export default function RatedTab({ sessionId }) {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [totalPagesRated, setTotalPagesRated] = useState(1);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRatedMovies() {
      try {
        setLoading(true);
        setError(null);

        // const genres = await res.getGenres();
        // setGenresList(genres);

        const rated = await res.getRatedMovies(sessionId, page);

        setRatedMovies(rated.results);
        setTotalPagesRated(rated.total_results);
      } catch (err) {
        setError(<Alert message={err.message} type="error" />);
      } finally {
        setLoading(false);
      }
    }
    if (sessionId) {
      getRatedMovies();
    } else {
      setError(
        <Alert
          message={
            "You need to rate movies first. Оцени фильмы из вкладки Search"
          }
          type="error"
        />
      );
    }
  }, [sessionId, page]);

  const onPaginationChange = (page) => {
    setPage(page);
  };
  
  const updatedProps = {
    sessionId,
    loading,
    activeTab: 'rated'
  }

  const content = (
    <>
      <MovieList
        info={ratedMovies}
        updatedProps={updatedProps}
      />
      <Flex justify="center">
        <Pagination
          total={totalPagesRated}
          pageSize={20}
          showSizeChanger={false}
          current={page}
          onChange={onPaginationChange}
        />
      </Flex>
    </>
  );

  const show = error ? error : content;

  return <>{show}</>;
}
