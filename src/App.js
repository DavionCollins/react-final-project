import { React } from "react-router-dom";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Nav from "./components/Nav";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  

  return (
    <Router>
      <div className="App">
        <Nav setMovies={setMovies} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/s" element={<Search movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
