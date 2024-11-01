/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react'

import Card from "../card"
import "./movie-app.css";
import MovieService from "../../services/movie-service";

export default function MovieApp() {
  const [moviesData, setMoviesData] = useState([])
  const [searchQuery, setSearchQuery] = useState('naruto')
  const [error, setError] = useState(null)

  const getMoviesData = async () => {
    if (searchQuery.trim().length === 0) {
      return
    }
    try {
      const res = new MovieService
      const data = await res.getMovies(searchQuery)
      setMoviesData(data.results)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    getMoviesData()
  }, [searchQuery]
  )
    return (
      <div class='wrapper'>
        <div className="container">
          <Card info={moviesData[0]} func={getMoviesData} />
          <Card info={moviesData[1]} func={getMoviesData} />
          <Card info={moviesData[2]} func={getMoviesData} />
          <Card info={moviesData[3]} func={getMoviesData} />
          <Card info={moviesData[4]} func={getMoviesData} />
          <Card info={moviesData[5]} func={getMoviesData} />
        </div>
      </div>
    );
}
