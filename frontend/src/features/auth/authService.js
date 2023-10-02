import axios from "axios";

const API_URL = "/api/users/";
const API_URL2 = "/api/users/login";
// regitet
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (userData) => {
  const response = await axios.post(API_URL2, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem("user");
const authService = {
  register,
  login,
  logout,
};

export default authService;
