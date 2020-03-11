import React, { Fragment, useState } from "react";
import AvatarSelector from "./AvatarSelector";
import {
  Label,
  Menu,
  Card,
  Image,
  Grid,
  Button,
  Visibility
} from "semantic-ui-react";

const TopBar = () => {
  const [activeItem, setActiveItem] = useState("Followers");
  const [visability, setVisability] = useState(false);
  const handleChange = (e, value) => {
    e.preventDefault();
    setActiveItem(value);
    console.log(value);
  };
  const handleImageClick = e => {
    e.preventDefault();
    if (visability === true) {
      setVisability(false);
    } else {
      setVisability(true);
    }
    console.log(visability);
  };
  return (
    <Fragment>
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
        <Menu.Item
          name="Followers"
          active={activeItem === "Followers"}
          onClick={e => handleChange(e, "Followers")}
        >
          Followers
          <Label color="teal">x</Label>
        </Menu.Item>

        <Menu.Item
          name="Friends"
          active={activeItem === "Friends"}
          onClick={e => handleChange(e, "Friends")}
        >
          Friends
          <Label>y</Label>
        </Menu.Item>

        <Menu.Item
          name="Notifications"
          active={activeItem === "Notifications"}
          onClick={e => handleChange(e, "Notifications")}
        >
          Notifications
          <Label>z</Label>
        </Menu.Item>
        <Menu.Menu position="right">
          <Button.Group>
            <Button>
              <Image
                onClick={e => handleImageClick(e)}
                avatar
                size="tiny"
                src="https://firebasestorage.googleapis.com/v0/b/book-buddies-d4ba1.appspot.com/o/author.png?alt=media&token=84d333c4-f58c-4223-a454-d94a9d6a4b0f"
              />
              <AvatarSelector />
            </Button>
          </Button.Group>
        </Menu.Menu>
      </Menu>
    </Fragment>
  );
};

export default TopBar;
