import React, { useState } from "react";
import noLogo from '../Assets/noPoster.png'

const Search = ({
  movies,
  searchTerm,
  currentPage,
  setCurrentPage,
  totalResults,
}) => {
  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const [sortBy, setSortBy] = useState("default");

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getSortedMovies = () => {
    if (!movies || movies.length === 0) return [];

    const moviesCopy = [...movies];

    if (sortBy === "name__asc") {
      return moviesCopy.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortBy === "name__dsc") {
      return moviesCopy.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (sortBy === "year__asc") {
      return moviesCopy.sort((a, b) => a.Year.localeCompare(b.Year));
    } else if (sortBy === "year__dsc") {
      return moviesCopy.sort((a, b) => b.Year.localeCompare(a.Year));
    } else {
      return moviesCopy;
    }
  };

  const sortedMovies = getSortedMovies();

  return (
    <div>
      <div id="search__result">
        <div className="search__result--filter">
          <div className="input__name">
            Search results:<span id="searchText">{searchTerm}</span>
          </div>
          <select
            className="filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="name__asc">Name (Ascending)</option>
            <option value="name__dsc">Name (Dscending)</option>
            <option value="year__asc">Year (Ascending)</option>
            <option value="year__dsc">Year (Dscending)</option>
          </select>
        </div>
        <div className="container">
          <div className="row">
            <div className="movie__list">
              {sortedMovies && sortedMovies.length > 0 ? (
                sortedMovies.map((movie) => (
                  <div className="movie" key={movie.imdbID}>
                    <img src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : noLogo} alt={movie.Title} />
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
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination__btn"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {currentPage > 3 && (
            <>
              <button className="pagination__btn" onClick={() => goToPage(1)}>
                1
              </button>
              {currentPage > 4 && <span className="pagination__dots">...</span>}
            </>
          )}

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              className={`pagination__btn ${
                currentPage === pageNum ? "pagination__btn--active" : ""
              }`}
              onClick={() => goToPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className="pagination__dots">...</span>
              )}
              <button
                className="pagination__btn"
                onClick={() => goToPage(totalPages)}
              >{totalPages}</button>
            </>
          )}
          <button
            className="pagination__btn"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
