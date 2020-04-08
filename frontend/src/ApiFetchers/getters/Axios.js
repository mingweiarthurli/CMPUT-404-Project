import axios from "axios";
import {
  currentUser,
  allUsers,
  idUsers,
  checkFriendships,
  myFriends,
  myFollowers,
  myFriendRequests,
  defaultVisiblePosts,
  idVisiblePosts,
  publicPosts,
  idPosts,
  idPostComments,
} from "../globalurl";

// Return current user with token auth
export const getCurrentUsers = (authorization) => {
  return axios.get(currentUser(), authorization);
};

// Return all authors in the world
export const getAllUsers = () => {
  return axios.get(allUsers());
};

// Get user profile with the ID specified
export const getIdUsers = (uid) => {
  return axios.get(idUsers(uid));
};

// Checks whether two uisers are friends
export const relationshipChecker = (uid1, uid2) => {
  return axios.get(checkFriendships(uid1, uid2));
};

export const getMyFriends = (uid, auth) => {
  return axios.get(myFriends(uid), {
    headers: { Authorization: `Token ${auth}` },
  });
};

export const getMyFollowers = (uid) => {
  return axios.get(myFollowers(uid));
};

export const getMyFriendRequests = (uid, auth) => {
  return axios.get(myFriendRequests(uid), {
    headers: { Authorization: `Token ${auth}` },
  });
};

export const getDefaultVisiblePosts = (token) => {
  return axios.get(defaultVisiblePosts(), {
    headers: { Authorization: `Token ${token}` },
  });
};

export const getIdVisiblePosts = (uid, token) => {
  return axios.get(idVisiblePosts(uid), {
    headers: { Authorization: `Token ${token}` },
  });
};

export const getPublicPosts = () => {
  return axios.get(publicPosts());
};

export const getIdPosts = (id) => {
  return axios.get(idPosts(id));
};

export const getIdPostComments = (id) => {
  return axios.get(idPostComments(id));
};
