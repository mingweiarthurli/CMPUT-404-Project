import React from "react";
import { Dropdown } from "semantic-ui-react";
const avatarOptions = [
  {
    key: "myPosts",
    text: "My Channel",
    icon: "address book outline"
  },
  {
    key: "editProfile",
    text: "Edit Profile",
    icon: "edit"
  },
  {
    key: "gitActivities",
    text: "Git Activities",
    icon: "github"
  },
  {
    key: "signOut",
    text: "Sign Out",
    icon: "delete"
  }
];

const AvatarSelector = () => (
  <Dropdown inline placeholder="" options={avatarOptions} />
);

export default AvatarSelector;
