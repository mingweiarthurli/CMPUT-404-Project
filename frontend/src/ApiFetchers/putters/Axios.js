import axios from "axios";
import {
  acceptFriendRequests,
  rejectFriendRequests,
  idPosts,
  idUsers,
} from "../globalurl";

//update user profile with the provided args
export const patchProfile = (uid, profiledata, auth) => {
  let temp = {
    firstName: profiledata.firstname,
    lastName: profiledata.lastname,
    host: profiledata.host,
    github: profiledata.github,
    email: profiledata.email,
    bio: profiledata.bio,
    userType: "author",
  };
  console.log(temp);
  axios
    .put(idUsers(uid), profiledata, {
      headers: { Authorization: `Token ${auth}` },
    })
    .catch((e) => {
      console.log(e);
    });
};
//update post with id
export const patchPost = (id, postData) => {
  axios
    .put(idPosts(id), { postData })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};
//accept friend request
export const iAccept = (uid, config) => {
  console.log(config);
  axios
    .put(acceptFriendRequests(uid), null, { headers: config })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};
//reject friend request
export const iReject = (uid, config) => {
  axios
    .put(rejectFriendRequests(uid), null, { headers: config })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};
