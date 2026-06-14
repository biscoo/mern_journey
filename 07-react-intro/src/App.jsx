import About from "./About";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to the React Routing App</h1>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Link to="/">Home</Link>
          <br />
          <Link to="/about">About</Link>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
