export default class MovieService {
  #apiBase = "https://api.themoviedb.org/3";
  #apiKey = "0c96cdac6ae72423826c279b74c858fc";

  async getResource(url) {
    const result = await fetch(`${this.#apiBase}${url}`);
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }
    return result.json();
  }

  async getMovies(query = "dogville") {
    return this.getResource(
      `/search/movie?api_key=${this.#apiKey}&language=en-US&query=${query}`
    );
  }
}