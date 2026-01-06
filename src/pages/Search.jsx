import React, { useState } from "react";

const Search = ({ movies }) => {

  const [sortBy, setSortBy] = useState('default')

  const getSortedMovies = () => {
    if (!movies || movies.length === 0) return []
  

  const moviesCopy = [...movies]

  if (sortBy === 'name__asc') {
    return moviesCopy.sort((a, b) => a.Title.localeCompare(b.Title))
  }
  else if (sortBy === 'name__dsc'){
    return moviesCopy.sort((a, b) => b.Title.localeCompare(a.Title))
  }
  else if(sortBy === 'year__asc') {
    return moviesCopy.sort((a, b) => a.Year.localeCompare(b.Year))
  }
  else if (sortBy === 'year__dsc') {
    return moviesCopy.sort((a, b) => b.Year.localeCompare(a.Year))
  }
else {
  return moviesCopy
}

}

const sortedMovies = getSortedMovies()

  return (
    <div>
      <div id="search__result">
        <div className="search__result--filter">
          <div className="input__name">
            Search results:<span id="searchText"></span>
          </div>
          <select className="filter" value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="name__asc">Name (Ascending)</option>
            <option value="name__dsc">Name (Dscending)</option>
            <option value="year__asc">Year (Ascending)</option>
            <option value="year__dsc">Year (Dscending)</option>
          </select>
        </div>
        <div className="container">
          <div className="row">
            <div className="movie__list" >
              {sortedMovies && sortedMovies.length > 0 ? (
                sortedMovies.map((movie) => (
                  <div className="movie" key={movie.imdbID}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                  </div>
                ))
              ) : (
                <p>No movies found. Try searching.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
