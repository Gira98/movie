export default class MovieService {
  #apiBase = "https://api.themoviedb.org/3";
  #apiKey = "0c96cdac6ae72423826c279b74c858fc";

  async getResource(url, options) {
    const result = await fetch(`${this.#apiBase}${url}`, options);
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }

    return result.json();
  }

  async getRatedResource(url) {
    let result;

    try {
      result = await fetch(`${this.#apiBase}${url}`);

      if (!result.ok) {
        if (result.status === 404 || result.status === 401) {
          const err = new Error("Hey! You need to rate films first!");
          err.code = result.status;
          throw err;
        }

        throw new Error(`Could not fetch ${url}, received ${result.status}`);
      }

      return result.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getMovies(query = "dogville", page = 1, sessionId) {
    const movies = await this.getResource(
      `/search/movie?api_key=${this.#apiKey}&language=en-US&query=${query}&page=${page}`
    );

    let ratedMovies = { results: [] };

    try {
      if (sessionId) {
        ratedMovies = await this.getRatedMovies(sessionId);
      }
    } catch (err) {
      console.log("No rated movies found:", err);
      return movies;
    }

    const moviesPlusRating = movies.results.map((movie) => {
      const ratedMovie = ratedMovies.results.find((mov) => mov.id === movie.id);

      if (ratedMovie) {
        movie.rating = ratedMovie.rating;

        return movie;
      } else {
        return movie;
      }
    });

    movies.results = moviesPlusRating;
    return movies;
  }

  async getGenres() {
    try {
      const result = await this.getResource(
        `/genre/movie/list?api_key=${this.#apiKey}`
      );
      return result.genres;
    } catch (err) {
      console.log(err.message);
    }
  }

  async createGuestSession() {
    const savedTime = sessionStorage.getItem("time");
    const savedGuestId = sessionStorage.getItem("guest_session_id");

    if (savedTime && savedGuestId) {
      const guestTime = Date.parse(savedTime);
      if (guestTime > Date.now()) {
        return sessionStorage.getItem("guest_session_id");
      }
    }

    sessionStorage.removeItem("time");
    sessionStorage.removeItem("guest_session_id");

    const res = await this.getResource(
      `/authentication/guest_session/new?api_key=${this.#apiKey}`
    );

    if (res.success) {
      sessionStorage.setItem("time", res.expires_at);
      sessionStorage.setItem("guest_session_id", res.guest_session_id);
    }

    return res.guest_session_id;
  }

  async addRating(movieId, rating, guestSessionId) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        accept: "application/json",
      },
      body: JSON.stringify({ value: rating }),
    };

    const res = await this.getResource(
      `/movie/${movieId}/rating?api_key=${this.#apiKey}&guest_session_id=${guestSessionId}`,
      options
    );

    return res.status_message;
  }

  async getRatedMovies(guestId, page = 1) {
    const res = await this.getRatedResource(
      `/guest_session/${guestId}/rated/movies?api_key=${this.#apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`
    );
    return res;
  }
}
