import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieSum = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovieDetails() {
      console.log("imdbId:", id);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?&apikey=e56ee402&i=${id}`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching movie details:", error);
        setLoading(false);
      }
    }

    getMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <div className="movie__details">
        <div className="movie__sum">
          <h1 className="movieSum__title">{movie.Title}</h1>
          <img src={movie.Poster} alt={movie.Title} className="movieSum__img" />
          <div className="movie__sum--bottom">
            <p className="movieSum__year">Year: {movie.Year}</p>
            <p className="movieSum__rating">Rating: {movie.imdbRating} / 10</p>
          </div>
        </div>
        <div className="movie__summary">
          <p className="movieSum__plot">Plot: {movie.Plot}</p>
          <p className="movieSum__director">Director: {movie.Director}</p>
          <p className="movieSum__writer">Writer: {movie.Writer}</p>
          <p className="movieSum__actor">Actors: {movie.Actors}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieSum;
