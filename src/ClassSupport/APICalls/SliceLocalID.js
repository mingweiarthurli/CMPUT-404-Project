import "react";

export const SliceLocalID = () => {
  let currentID = localStorage.getItem("currentID");
  if (currentID) {
    currentID = currentID.slice(-36);
  }
  return currentID;
};
