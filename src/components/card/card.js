import { Component, useEffect } from "react";
import "./card.css";

export default function Card({ info }) {
  if (!info) {
    return null
  }

  const { title, overview, poster_path } = info
  const imgBase = "https://image.tmdb.org/t/p/w500"

  function cutText() {
    const arr = overview.split(' ')
    const array = arr.slice(0, 22)
    return `${array.join(' ')}...`
  }

    return (
      <div className="card">
        <img src={`${imgBase}${poster_path}`} alt="poster"></img>
        <section className="description">
          <h1>{title}</h1>
          <span className="date">March 5, 2020</span>
          <div className="genres">
            <button>Action</button>
            <button>Drama</button>
          </div>
          <article>
            {cutText()}
          </article>
        </section>
      </div>
    );
}


