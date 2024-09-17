import  Navbar  from "./components/Navbar";
import  Home  from "./components/Home";
import  About  from "./components/About";
import Signin from "./components/Signin";
import Signup from "./components/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <ToastContainer/>
        <div className="container my-3">
        <Routes>
          <Route exact path="/" element={<Home toast={toast}/>} />
          <Route exact path="/about" element={<About toast={toast}/>} />
          <Route exact path="/signin" element={<Signin toast={toast}/>} />
          <Route exact path="/signup" element={<Signup toast={toast}/>} />
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
