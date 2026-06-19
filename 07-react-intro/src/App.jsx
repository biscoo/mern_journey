import NewNote from "./pages/NewNote";
import NoteDetail from "./pages/NoteDetail";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to the Notes App</h1>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/notes/new" element={<NewNote />} />
          </Routes>
          <Link to="/">Home</Link>
          <br />
          <Link to="/notes/new">New Note</Link>
          <br />
          <Link to="/notes/1">Note Detail</Link>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
