/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";
import { Offline, Online } from "react-detect-offline";

import "./movie-app.css";
import MovieService from "../../services/movie-service";
import SearchTab from "../search-tab/search-tab";
import RatedTab from "../rated-tab/rated-tab";

import { debounce } from "lodash";
import { Alert, Tabs } from "antd";
import GenresContext from "../../context";

const res = new MovieService();

export default function MovieApp() {
  const [genresList, setGenresList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [sessionId, setSessionId] = useState(null);
  const [ratingSearch, setRatingSearch] = useState({})

  const propsSearchTab = {
    error,
    loading,
    totalPages,
    sessionId,
    page,
    ratingSearch,
    setRatingSearch
  };

  const getMoviesData = async () => {
    if (searchQuery.trim().length === 0) {
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const data = await res.getMovies(searchQuery, page, sessionId);

      if (!data.total_pages) {
        setError(<Alert message="No movies found" type="error" />);
        setMoviesData([]);
      } else {
        setMoviesData(data.results);
        setTotalPages(data.total_results);
      }
    } catch (err) {
      setError(<Alert message={err.message} type="error" />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const createSession = async () => {
      if (!sessionId) {
        const guest = await res.createGuestSession();
        setSessionId(guest);
      }
    };
    createSession();

    const getGenres = async () => {
      const genres = await res.getGenres();
      setGenresList(genres);
    };
    getGenres();
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const debounced = debounce(() => {
      getMoviesData();
    }, 500);

    debounced();

    return () => {
      debounced.cancel();
    };
  }, [searchQuery, page, sessionId]);

  const onPaginationChange = (page) => {
    setPage(page);
  };

  const items = [
    {
      key: "search",
      label: "Search",
      children: (
        <SearchTab
          info={moviesData}
          propsSearchTab={propsSearchTab}
          setSearchQuery={setSearchQuery}
          onPaginationChange={onPaginationChange}
        />
      ),
    },
    {
      key: "rated",
      label: "Rated",
      children: (
        <RatedTab sessionId={sessionId} />
      ),
    },
  ];

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <Online>
            <div className="content">
              <GenresContext.Provider value={genresList}>
                <Tabs
                  defaultActiveKey="1"
                  items={items}
                  destroyInactiveTabPane
                />
              </GenresContext.Provider>
            </div>
          </Online>

          <Offline>
            <Alert
              type="error"
              message={`Oops, no internet connection, babygirl`}
              showIcon={true}
            />
          </Offline>
        </div>
      </div>
    </>
  );
}
