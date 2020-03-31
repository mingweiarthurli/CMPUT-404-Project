import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  getMyFollowers,
  getMyFriendRequests,
  getMyFriends
} from "../../ApiFetchers/getters/Axios";
import FriendshipButtons from "./FriendshipButtons";
import ImgUpload from "./ImgUpload";
import NewPostForm from "./NewPostForm";
import {
  Label,
  Menu,
  Dropdown,
  List,
  Button,
  Form,
  Modal,
  ListContent,
  Select,
  Segment
} from "semantic-ui-react";

var username = localStorage.getItem("currentUser");
const avatarOptions = [
  {
    key: "myPosts",
    text: "My Channel",
    value: "myPosts",
    icon: "address book outline"
  },
  {
    key: "editProfile",
    text: "Edit Profile",
    value: "editProfile",
    icon: "edit"
  },
  {
    key: "gitActivities",
    text: "Git Activities",
    value: "gitActivities",
    icon: "github"
  },
  {
    key: "signOut",
    text: "Sign Out",
    value: "signOut",
    icon: "delete"
  }
];

const TopBar = () => {
  const [redir, setRedir] = useState(null);
  const handleSpecialRoutes = (e, { value }) => {
    e.preventDefault();
    setRedir(value);
  };
  const handleRedir = () => {
    if (redir != null && redir.length > 2) {
      return <Redirect to={redir} />;
    }
  };

  return (
    <Fragment>
      {handleRedir()}
      <Menu>
        <Menu.Item>
          <a href="/">
            <img
              style={{ height: "45px" }}
              src="https://firebasestorage.googleapis.com/v0/b/book-buddies-d4ba1.appspot.com/o/pepsi.png?alt=media&token=a64adec5-cbb2-475a-9ae4-66f58dfc1bd5"
              alt="Homepage"
            />
          </a>
        </Menu.Item>
        <FriendshipButtons />
        <Menu.Menu position="right">
          <Modal
            trigger={
              <Menu.Item name="AddPhoto">
                Add Photo
                <Label>*</Label>
              </Menu.Item>
            }
          >
            <Modal.Header>Upload Your Photo</Modal.Header>
            <Modal.Content>
              <ImgUpload />
            </Modal.Content>
          </Modal>
          <Modal
            trigger={
              <Menu.Item name="NewPosts">
                New Post
                <Label>+</Label>
              </Menu.Item>
            }
          >
            <Modal.Header>Create Post</Modal.Header>
            <Modal.Content>
              <NewPostForm />
            </Modal.Content>
          </Modal>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Dropdown
              text={username}
              icon="user"
              size="small"
              floating
              button
              className="icon"
            >
              <Dropdown.Menu>
                {avatarOptions.map(option => (
                  <Dropdown.Item
                    key={option.value}
                    {...option}
                    onClick={handleSpecialRoutes}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Menu.Menu>
      </Menu>
    </Fragment>
  );
};

export default TopBar;
