import {
  getAllUsers,
  getMyFriends,
  getIdUsers,
  getMyFollowers,
  getMyFriendRequests,
  getDefaultVisiblePosts,
  getIdPostComments,
  getIdVisiblePosts,
  getIdPosts,
  getPublicPosts,
} from "../../ApiFetchers/getters/Axios";
//import {} from "../../ApiFetchers/posters/Axios";
//import {} from "../../ApiFetchers/putters/Axios";
import { SliceLocalID } from "../../ClassSupport/APICalls/SliceLocalID";
import React, { useEffect } from "react";

const Logger = () => {
  useEffect(() => {
    const caller = async () => {
      if (SliceLocalID !== "") {
        try {
          let localID = SliceLocalID();
          const g1 = await getAllUsers();
          const g2 = await getMyFriends(localID);
          const g3 = await getMyFollowers(localID);
          const g4 = await getMyFriendRequests(localID);
          //const g5 = await getIdPosts();
          const g6 = await getIdUsers(localID);
          const g7 = await getPublicPosts();
          //const g8 = await getDefaultVisiblePosts();
          const g9 = await getIdVisiblePosts(localID);
          //const g10 = await getIdPostComments();
          console.log(`
            ${JSON.stringify(g1.data)}|\n
            ${JSON.stringify(g2.data)}|\n
            ${JSON.stringify(g3.data)}|\n
            ${JSON.stringify(g4.data)}|\n
            ${JSON.stringify(g6.data)}|\n
            ${JSON.stringify(g7.data)}|\n
            ${JSON.stringify(g9.data)}|\n`);
        } catch (e) {
          console.log(e);
        }
      }
    };
    caller();
  }, []);
  return <p>Working on it...</p>;
};

export default Logger;
