import { Link, useNavigate } from "react-router-dom";
import "../CSS/navbar/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { logout, reset } from "../features/auth/authSlice";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const onLogout = () => {
  //   dispatch(logout());
  //   dispatch(reset());
  //   navigate("/");
  // };
  return (
    <div className="main-navbar">
      <div className="navbar-logo">
        <Link to={"/"} className="navbar-logo-name">
          bint-go
        </Link>
      </div>

      <div className="navbar-btns">
        {!user ? (
          <Link to="/login" className="navbar-btn">
            <FaSignInAlt />
            Sing-in
          </Link>
        ) : (
          <Link to="/profile" className="navbar-btn">
            <FaUserAlt className="nav-profile-icon" />
            profile
          </Link>
        )}
        {/* <div className="navbar-btn" onClick={onLogout}>
            <FaSignOutAlt />
            Logout
          </div> */}
      </div>
    </div>
  );
}

export default Navbar;
