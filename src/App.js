import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AdminState from "./context/admins/adminState";
import AdminHome from "./components/AdminHome";
import About from "./components/About";
import Signin from "./components/Signin";
import Signup from "./components/Signup"
import Userprofile from "./components/Userprofile";
import Changepassword from "./components/Changepassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserState from "./context/user/userState";
import Forgetpassword from "./components/Forgetpassword";
import Pagenotfound from "./components/Pagenotfound";
import Allusers from "./components/Allusers";
import Userdetails from "./components/Userdetails";

function App() {
  return (
    <>
      <AdminState toast={toast}>
        <UserState toast={toast}>
          <NoteState toast={toast}>
            <BrowserRouter>
              <Navbar />
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
              <div className="container my-3">
                <Routes>
                  <Route exact path="/" element={<Home toast={toast} />} />
                  <Route exact path="/admin-dashboard" element={<AdminHome />} />
                  <Route exact path="/about" element={<About toast={toast} />} />
                  <Route exact path="/signin" element={<Signin toast={toast} />} />
                  <Route exact path="/forgetpassword" element={<Forgetpassword />} />
                  <Route exact path="/signup" element={<Signup toast={toast} />} />
                  <Route exact path="/userprofile" element={<Userprofile toast={toast} />} />
                  <Route exact path="/changepassword" element={<Changepassword toast={toast} />} />
                  <Route exact path="/allusers" element={<Allusers toast={toast} />} />
                  <Route exact path="/allusers/userdetails" element={<Userdetails toast={toast} />} />
                  <Route exact path="*" element={<Pagenotfound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </NoteState>
        </UserState>
      </AdminState>
    </>
  );
}

export default App;
