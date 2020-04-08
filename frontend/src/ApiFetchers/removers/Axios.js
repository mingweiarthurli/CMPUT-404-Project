import axios from "axios";
import { unfollowFriendRequests, idPosts, idUsers } from "../globalurl";

export const iUnfollow = (uid, auth) => {
  return axios.delete(unfollowFriendRequests(uid), { headers: auth });
};
