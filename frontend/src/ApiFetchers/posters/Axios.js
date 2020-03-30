import axios from "axios";
import Cookies from "js-cookie";
import {
  allFriendRequests,
  allPosts,
  allUsers,
  authRegister,
  authLogin,
  authLogout
} from "../globalurl";

export const userSignin = (email, username, password) => {
  return axios.post(authLogin(), {
    email,
    username,
    password
  });
};

export const userSignup = (email, username, password) => {
  return axios.post(authRegister(), {
    email,
    username,
    password1: password,
    password2: password
  });
};

export const userLogout = () => {
  const cookieClear = {
    "X-CSRFToken": Cookies.get("csrftoken")
  };
  return axios.post(authLogout(), null, { headers: cookieClear });
};
