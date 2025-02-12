import "./card.css";
import Spinner from "../spinner";
import { Rate, Tag } from "antd";
import GenresContext from "../../context";
import { useContext } from "react";
import { format } from "date-fns";
import MovieService from "../../services/movie-service";

export default function Card({ info, loading, sessionId, activeTab }) {
  if (!info) {
    return null;
  }

  const spinner = loading ? <Spinner /> : null;
  const content = !loading ? (
    <MovieView info={info} sessionId={sessionId} activeTab={activeTab} />
  ) : null;

  return (
    <li className="card">
      {spinner}
      {content}
    </li>
  );
}

const MovieView = ({ info, sessionId, activeTab }) => {
  const {
    title,
    id,
    genre_ids: genreId,
    overview,
    poster_path: posterPath,
    release_date: releaseDate,
    rating,
    vote_average: voteAverage,
  } = info;

  const imgBase = "https://image.tmdb.org/t/p/w500";

  const res = new MovieService();

  function cutText(text, length) {
    if (text.length > 20) {
      const arr = text.split(" ");
      const array = arr.slice(0, length);
      return `${array.join(" ")}...`;
    } else {
      return text;
    }
  }

  const allGenresList = useContext(GenresContext);

  const movieGenresList = genreId.map((id) => {
    return allGenresList.find((el) => id === el.id).name;
  });

  const genresForShow = movieGenresList.map((el, index) => (
    <Tag key={index}>{el}</Tag>
  ));

  const formattedDate = releaseDate
    ? format(releaseDate, "MMMM dd, yyyy")
    : "Release date is unknown";

  const onRatingChange = async (id, rating) => {
    try {
      await res.addRating(id, rating, sessionId);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onChange = (value) => {
    onRatingChange(id, value);
  };

  let isRatingDisabled;

  if (activeTab === "search") {
    isRatingDisabled = false;
  } else if (activeTab === "rated") {
    isRatingDisabled = true;
  }

  let color = "";

  if (voteAverage < 3) {
    color = "rating-red";
  } else if (voteAverage >= 3 && voteAverage < 5) {
    color = "rating-orange";
  } else if (voteAverage >= 5 && voteAverage < 7) {
    color = "rating-yellow";
  } else {
    color = "rating-green";
  }

  return (
    <>
      <img src={`${imgBase}${posterPath}`} alt="poster"></img>
      <section className="description">
        <div className={`rating ${color}`}>{voteAverage.toFixed(1)}</div>
        <h1>{cutText(title, 4)}</h1>
        <span className="date">{formattedDate}</span>
        <div className="genres">{genresForShow}</div>
        <article>{cutText(overview, 20)}</article>
        <Rate
          allowHalf
          defaultValue={rating}
          count={10}
          className="stars"
          disabled={isRatingDisabled}
          onChange={(a) => {
            onChange(a);
          }}
        />
      </section>
    </>
  );
};
