import axios from "axios";
import {
  acceptFriendRequests,
  rejectFriendRequests,
  idPosts,
  idUsers
} from "../globalurl";

export const patchProfile = (uid, profiledata) => {
  axios
    .put(idUsers(uid), { profiledata })
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    });
};
