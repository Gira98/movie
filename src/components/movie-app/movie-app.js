/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react'

import Card from "../card"
import "./movie-app.css";
import MovieService from "../../services/movie-service";

import { Alert } from "antd";

export default function MovieApp() {
  const [moviesData, setMoviesData] = useState([])
  const [searchQuery, setSearchQuery] = useState('naruto')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const getMoviesData = async () => {
    if (searchQuery.trim().length === 0) {
      return
    }
    try {
      const res = new MovieService
      const data = await res.getMovies(searchQuery)

      if (!data.total_results) {
        setError(<Alert message="There are no movies like that, girl" type="error" />)
      }

      setMoviesData(data.results)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setError(<Alert message={err} type="error" />)
    }
  }

  useEffect(() => {
    getMoviesData()
  }, [searchQuery]
  )
    return (
      <div class='wrapper'>
        <ul className="container">
          { error }
          <Card info={moviesData[0]} loading={loading} />
          <Card info={moviesData[1]} loading={loading}/>
          <Card info={moviesData[2]} loading={loading}/>
          <Card info={moviesData[3]} loading={loading}/>
          <Card info={moviesData[4]} loading={loading}/>
          <Card info={moviesData[5]} loading={loading}/>
        </ul>
      </div>
    );
}
