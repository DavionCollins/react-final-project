import { React } from "react-router-dom";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Nav from "./components/Nav";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [poster, setPoster] = useState(true);

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Implement Page change for movie search
// https://claude.ai/chat/7804fe99-e21e-4488-b690-2becc8850a22
