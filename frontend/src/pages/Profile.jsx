import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/pages/Register.css";
import { useSelector, useDispatch } from "react-redux";
import { update, updatelogin, reset, logout } from "../features/auth/authSlice";
import Kspinner from "../assets/Kspinner";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const Iname = useRef();
  const Ipass = useRef();
  const [Loading, setLoading] = useState(false);
  const [Save, setSave] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    phoneNo: "",
    phoneNo2: "",
  });
  const { name, surname, email, phoneNo, city, phoneNo2 } = formData;
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const { isComfirmed, isNotComfirmed, ischeking } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSave(true);
  };
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);
  useEffect(() => {
    if (updateMode) {
      Iname.current.focus();
    }
  }, [updateMode]);
  if (isLoading) {
  }
  useEffect(() => {
    if (isNotComfirmed) {
      toast.dismiss();
      toast.error("Wrong password");
    }
  }, [isNotComfirmed]);
  useEffect(() => {
    if (isComfirmed) {
      const userData = {
        name,
        surname,
        phoneNo,
        phoneNo2,
        city,
      };
      dispatch(update(userData));
    }
  }, [isComfirmed]);
  const onGoSave = () => {
    const data = {
      email: user.email,
      password,
    };
    dispatch(updatelogin(data));
  };
  useEffect(() => {
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
    if (isSuccess) {
      setSave(false);
      setUpdateMode(false);
    }
  }, [dispatch, isSuccess, isError, message]);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="main-Register">
      <div className="Register">
        <div className="Register-body">
          {ischeking && (
            <div className="Register-loading">
              <Kspinner />
            </div>
          )}
          <div className="Register-titles">
            <h1>my account</h1>
            <div className="Register-head-btns">
              {!updateMode ? (
                <button
                  type="button"
                  className="all-btn-submit  all-fz-18px  all-B-green "
                  onClick={() => {
                    setUpdateMode(true);
                    Iname.current.focus();
                  }}
                >
                  edit
                </button>
              ) : (
                <button
                  type="button"
                  className="all-btn-submit  all-fz-18px  all-B-red "
                  onClick={() => {
                    setUpdateMode(false);
                    setFormData(user);
                  }}
                >
                  cancel
                </button>
              )}
              <button
                type="button"
                className="all-btn-submit  all-fz-18px  all-B-red "
                onClick={onLogout}
              >
                logout
              </button>
              <button
                type="button"
                className="all-btn-submit  all-fz-18px  all-B-main "
                onClick={() => navigate("/")}
              >
                back
              </button>
            </div>
          </div>
          {Save && (
            <div className="Register-PopUp">
              <div className="">
                <main className="Register-form RE-pop">
                  <h1>to save changes please enter your password</h1>
                  <div className="all-box Register-box">
                    <label htmlFor="" className="all-form-label">
                      eamil:
                    </label>
                    <input
                      type="text"
                      className="all-form-input all-H-25px all-fz-18px Register-input "
                      onChange={onChange}
                      value={email}
                      id="email"
                      disabled={true}
                    />
                  </div>
                  <div className="all-box Register-box">
                    <label htmlFor="" className="all-form-label">
                      password:
                    </label>
                    <input
                      type="password"
                      ref={Ipass}
                      className="all-form-input all-H-25px all-fz-18px Register-input "
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      autoComplete="off"
                    />
                  </div>
                  <div className="Register-btn-box">
                    <button
                      onClick={onGoSave}
                      type="submit"
                      className="all-btn-submit all-H-40px all-W-98pc all-fz-25px all-B-green"
                    >
                      save changes
                    </button>
                  </div>
                </main>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="Register-form">
            <div className="all-boxes Register-column">
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  name:
                </label>
                <input
                  type="text"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="name"
                  value={name}
                  ref={Iname}
                  disabled={!updateMode}
                />
              </div>
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  surname:
                </label>
                <input
                  type="text"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="surname"
                  value={surname}
                  disabled={!updateMode}
                />
              </div>
            </div>
            {/* line two */}
            <div className="all-boxes Register-column">
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  email:
                </label>
                <input
                  type="email"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="email"
                  value={email}
                  disabled={true}
                />
              </div>
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  city:
                </label>
                <input
                  type="text"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="city"
                  value={city}
                  disabled={!updateMode}
                />
              </div>
            </div>

            {/* line three */}
            <div className="all-boxes Register-column">
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  phone no:
                </label>
                <input
                  type="number"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="phoneNo"
                  value={phoneNo}
                  disabled={!updateMode}
                />
              </div>
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  phone no 2:
                </label>
                <input
                  type="number"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="phoneNo2"
                  value={phoneNo2}
                  disabled={!updateMode}
                />
              </div>
            </div>
            <div className="Register-btn-box">
              {updateMode && (
                <button
                  type="submit"
                  className="all-btn-submit all-H-40px all-W-98pc all-fz-25px all-B-green"
                  onClick={() => setUpdateMode(true)}
                >
                  update account
                </button>
              )}
            </div>
            {/* <h1 className="register-login">
              or have an account{" "}
              <Link to={"/login"} className="register-login-a">
                sing in
              </Link>
            </h1> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
