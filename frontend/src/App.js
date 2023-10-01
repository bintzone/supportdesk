import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewTicket from "./pages/NewTicket";
import PrivateRoute from "./components/PrivateRoute";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import Table from "./pages/Table";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <div className="all-app">
          <Navbar />
          <Routes>
            {/* pro */}
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/table" element={<Table />} />

            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>
            <Route path="/ticket/:id" element={<PrivateRoute />}>
              <Route path="/ticket/:id" element={<Ticket />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
