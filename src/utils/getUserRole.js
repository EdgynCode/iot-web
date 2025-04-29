import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const decode = user ? jwtDecode(user?.jwtAccessToken) : null;
  return decode ? decode.role : null;
};
