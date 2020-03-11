import React from "react";
import { Dropdown } from "semantic-ui-react";
const avatarOptions = [
  {
    key: "",
    text: "",
    icon: ""
  },
  {
    key: "editProfile",
    text: "Edit Profile",
    icon: "edit"
  },
  {
    key: "signOut",
    text: "Sign Out",
    icon: "delete"
  }
];

const AvatarSelector = () => (
  <Dropdown floating placeholder="" options={avatarOptions} />
);

export default AvatarSelector;
