import React, { useState } from "react";
import { userLogout } from "../../ApiFetchers/posters/Axios";

export const AvatarSwitch = cmd => {
  let result = "";
  switch (cmd) {
    case "signOut":
      userLogout();
      result = "signin";
      break;
    case "myPosts":
      result = "myposts";
      break;
    case "editProfile":
      result = "user/dashboard";
      break;
    case "gitActivities":
      result = "user/gitactivities";
      break;
    default:
      break;
  }
  return result;
};
