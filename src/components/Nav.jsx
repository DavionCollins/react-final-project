import React, { useEffect, useState } from "react";
import movieLogo from "../Assets/movie__logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Nav = ({
  setMovies,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  setTotalResults,
}) => {
  const navigate = useNavigate();
  function Header() {
    const location = useLocation();
    const pageClass = location.pathname;

    let heading = "";

    if (location.pathname === "/") {
      heading = (
        <span className={`heading heading-${pageClass}`}>
          America's most awarded movie platform
        </span>
      );
    } else if (location.pathname === "/s") {
      heading = `Browse our Movies`;
    } else if (location.pathname.startsWith(`/movie/`)) {
      heading = "Movie Details";
    } else {
      heading = `Page not found`;
    }

    return heading;
  }

  function openMenu() {
    document.body.classList.add("menu__open");
  }

  function closeMenu() {
    document.body.classList.remove("menu__open");
  }

  async function onSearchClick(page) {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=e56ee402&s=${searchTerm}&page=${page}`
    );
    if (data.Response === "True") {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
    } else {
      setMovies([]);
      setTotalResults(0);
    }

    navigate("/s");
  }

  useEffect(() => {
    if (searchTerm) {
      onSearchClick(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    onSearchClick();
  }, []);

  function onSearch() {
    onSearchClick(searchTerm);
  }

  function onSearchKeyPress(key) {
    if (key === "Enter") {
      onSearch();
    }
  }

  return (
    <div>
      <nav>
        <div className="overlay"></div>
        <div className="nav__top">
          <div className="menu"></div>
          <div className="nav__logo--wrapper">
            <img className="nav__logo" src={movieLogo} />{" "}
            <h1 className="site__title">Flick</h1>
          </div>
          <div className="nav__links">
            <Link to="/" className="nav__link">
              Home
            </Link>
            <Link to="/s" className="nav__link">
              Browse
            </Link>
            <Link to="/" className="nav__link nav__link--primary">
              Contact
            </Link>
          </div>
          <button className="btn__menu" onClick={() => openMenu()}>
            <FontAwesomeIcon icon={"bars"} />
          </button>
        </div>
        <div className="menu">
          <button
            className=" btn__menu btn__menu--close"
            onClick={() => closeMenu()}
          >
            <i className="fa-solid fa-x"></i>
          </button>
          <div className="menu__links">
            <Link to="/" onClick={() => closeMenu()} className="menu__link">
              Home
            </Link>
            <Link to="/s" onClick={() => closeMenu()} className="menu__link">
              Browse
            </Link>
            <Link to="/" onClick={() => closeMenu()} className="menu__link">
              Contact
            </Link>
          </div>
        </div>
        <h1 className="search__title">{Header()}</h1>
        <div className="search">
          <div className="input__wrapper">
            <input
              type="text"
              className="search__input"
              placeholder="Search by Name, Year, or Keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(event) => {
                onSearchKeyPress(event.key);
              }}
            ></input>
            <button className="search__button" onClick={() => onSearchClick()}>
              <FontAwesomeIcon icon={"magnifying-glass"} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
