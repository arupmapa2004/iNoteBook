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
import Contactus from "./components/Contactus";
import Swal from "sweetalert2";
import Resetpassword from "./components/Resetpassword";

function App() {
  return (
    <>
        <UserState toast={toast} Swal={Swal}>
          <NoteState toast={toast} Swal={Swal}>
      <AdminState toast={toast} Swal={Swal}>

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
                  <Route exact path="/" element={<Home toast={toast} Swal={Swal} />} />
                  <Route exact path="/admin-dashboard" element={<AdminHome Swal={Swal}/>} />
                  <Route exact path="/about" element={<About toast={toast} Swal={Swal} />} />
                  <Route exact path="/contactus" element={<Contactus toast={toast} Swal={Swal} />} />
                  <Route exact path="/signin" element={<Signin toast={toast} Swal={Swal} />} />
                  <Route exact path="/forgetpassword" element={<Forgetpassword />} />
                  <Route exact path="/reset-password" element={<Resetpassword/>} />
                  <Route exact path="/signup" element={<Signup toast={toast} Swal={Swal} />} />
                  <Route exact path="/userprofile" element={<Userprofile toast={toast} Swal={Swal} />} />
                  <Route exact path="/changepassword" element={<Changepassword toast={toast} Swal={Swal} />} />
                  <Route exact path="/allusers" element={<Allusers toast={toast} Swal={Swal} />} />
                  <Route exact path="/allusers/userdetails" element={<Userdetails toast={toast} Swal={Swal} />} />
                  <Route exact path="*" element={<Pagenotfound />} />
                </Routes>
              </div>
            </BrowserRouter>
            </AdminState>
          </NoteState>
        </UserState>
    </>
  );
}

export default App;
