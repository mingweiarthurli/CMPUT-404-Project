import axios from "axios";
import Cookies from "js-cookie";
import {
  authRegister,
  authLogin,
  authLogout,
  allFriendRequests,
  publicPosts,
  idPostComments,
} from "../globalurl";

export const userSignin = (username, password) => {
  return axios.post(authLogin(), {
    username,
    password,
  });
};

export const userSignup = (email, username, password) => {
  return axios.post(authRegister(), {
    email,
    username,
    password1: password,
    password2: password,
  });
};

export const userLogout = () => {
  const cookieClear = {
    "X-CSRFToken": Cookies.get("csrftoken"),
    Authorization: `Token ${localStorage.getItem("currentToken")}`,
  };
  localStorage.clear();
  return axios.post(authLogout(), null, { headers: cookieClear });
};

export const startFollowing = (follower, followee) => {
  let shortlive = {
    query: "friendrequest",
    author: follower,
    friend: followee,
  };
  return axios
    .post(allFriendRequests(), shortlive)
    .then((res) => {
      if (res.status === 200) {
        alert("You've started following this author.");
      }
    })
    .catch((e) => {
      alert("You've already sent this request. No need to send it again.");
    });
};

export const addPost = (data, auth) => {
  console.log(data);
  return axios.post(publicPosts(), data, {
    headers: { Authorization: `Token ${auth}` },
  });
};

export const addComments = (data) => {
  return axios.post(idPostComments, data);
};
