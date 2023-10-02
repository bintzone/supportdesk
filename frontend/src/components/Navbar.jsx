import { Link, useNavigate } from "react-router-dom";
import "../CSS/navbar/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
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
          <Link to="/" className="navbar-btn" onClick={onLogout}>
            <FaSignOutAlt />
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
