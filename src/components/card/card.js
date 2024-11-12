import "./card.css";
import Spinner from '../spinner'

export default function Card({ info, loading }) {
  if (!info) {
    return null
  }

  const { id } = info

  const spinner = loading ? <Spinner /> : null
  const content = !loading ? <MovieView info={info} /> : null

    return (
      <li key={id} className="card">
        { spinner }
        { content }
      </li>
    );
}


const MovieView = ({info}) => {
  const { title, overview, poster_path: posterPath } = info
  const imgBase = "https://image.tmdb.org/t/p/w500"

  function cutText() {
    const arr = overview.split(' ')
    const array = arr.slice(0, 22)
    // console.log(info)
    return `${array.join(' ')}...`
  }

  return (
    <>
      <img src={`${imgBase}${posterPath}`} alt="poster"></img>
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
    </>
  )
}