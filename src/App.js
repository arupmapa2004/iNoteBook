import  Navbar  from "./components/Navbar";
import  Home  from "./components/Home";
import  About  from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";


function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div className="container my-3">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
