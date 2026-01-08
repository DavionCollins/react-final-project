import { React } from "react-router-dom";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Nav from "./components/Nav";
import { useState } from "react";
import MovieSum from "./components/MovieSum";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  return (
    <Router>
      <div className="App">
        <Nav
          setMovies={setMovies}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalResults={setTotalResults}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/s"
            element={
              <Search
                movies={movies}
                searchTerm={searchTerm}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalResults={totalResults}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieSum />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
