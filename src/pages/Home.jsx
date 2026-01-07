import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=e56ee402&s=fast`
    );
    console.log(data.Search);
    setMovies(data.Search);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="container">
        <div className="featured__movies">
          <h2>Featured Movies</h2>
        </div>
        <div className="row">
          <div className="movie__list">
            {movies.map((movie) => (
              <div className="movie">
                <Link to={`/movie/${movie.imdbID}`}>
                <img className="movie__poster" src={movie.Poster} />
                </Link>
                <h3 className="movie__title">{movie.Title}</h3>
                <p className="movie__year">{movie.Year}</p>
              </div>
            )).slice(0,6)}
            ;
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
