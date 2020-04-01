import axios from "axios";
import {
  allUsers,
  allPosts,
  idUsers,
  defaultVisiblePosts,
  idVisiblePosts,
  myFriends,
  myFollowers,
  myFriendRequests,
  currentUser
} from "../globalurl";

// Return current user with token auth
export const getCurrentUsers = authorization => {
  return axios.get(currentUser(), authorization);
};

export const viewablePosts = () => {
  return axios.get(allPosts());
};
// Return all authors in the world
export const getAllUsers = () => {
  console.log(axios.get(allUsers()));
  return axios.get(allUsers());
};

// Get user profile with the ID specified
export const getIdUsers = uid => {
  return axios.get(idUsers(uid));
};

export const getDefaultVisiblePosts = () => {
  return axios.get(defaultVisiblePosts());
};

export const getIdVisiblePosts = uid => {
  return axios.get(idVisiblePosts(uid));
};

export const getMyFriends = uid => {
  return axios.get(myFriends(uid));
};

export const getMyFollowers = uid => {
  return axios.get(myFollowers(uid));
};

export const getMyFriendRequests = () => {
  return axios.get(myFriendRequests);
};
