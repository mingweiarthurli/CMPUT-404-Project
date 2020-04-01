import React, { Fragment, useState, useEffect } from "react";
import {
  getMyFollowers,
  getMyFriendRequests,
  getMyFriends
} from "../../ApiFetchers/getters/Axios";
import {
  Label,
  Menu,
  List,
  Button,
  Modal,
  ListContent
} from "semantic-ui-react";
var localID = localStorage.getItem("currentID");
const FriendshipButtons = () => {
  const [activeItem, setActiveItem] = useState("Followers");
  const [followersLoading, setFollowersLoading] = useState(true);
  const [followersError, setFollowersError] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [friendRequestsLoading, setFriendRequestsLoading] = useState(true);
  const [friendRequestsError, setFriendRequestsError] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendsError, setFriendsError] = useState(false);
  const [friends, setFriends] = useState([]);
  const handleChange = (e, value) => {
    e.preventDefault();
    setActiveItem(value);
    console.log(value);
  };
  useEffect(() => {
    const followersList = async () => {
      setFollowersLoading(true);
      setFollowersError(false);
      try {
        if (localID !== undefined) {
          let followersFetcher = await getMyFollowers(localID); //get data from api's url
          setFollowers(followersFetcher.authors);
        }
      } catch (error) {
        setFollowersError(true);
      }
      setFollowersLoading(false);
    }; //fetch followers
    const friendsList = async () => {
      setFriendsLoading(true);
      setFriendsError(false);
      try {
        if (localID !== undefined) {
          let friendsFetcher = await getMyFriends(localID); //get data from api's url
          setFriends(friendsFetcher.authors);
        }
      } catch (error) {
        setFriendsError(true);
      }
      setFriendsLoading(false);
    }; //fetch friends
    const friendRequestsList = async () => {
      setFriendRequestsError(false);
      setFriendRequestsLoading(true);
      /*try {
        if (localID !== undefined) {
          let friendRequestsFetcher = await getMyFriendRequests(localID); //get data from api's url
          setFriendRequests(friendRequestsFetcher.authors);
        }
      } catch (error) {
        setFriendRequestsError(true);
      }*/
      setFriendRequestsLoading(false);
    };
    followersList();
    friendsList();
    friendRequestsList();
  }, []);

  return (
    <Fragment>
      <Modal
        trigger={
          <Menu.Item
            name="Followers"
            active={activeItem === "Followers"}
            onClick={e => handleChange(e, "Followers")}
          >
            Followers
            <Label color="teal">x</Label>
          </Menu.Item>
        }
      >
        <Modal.Header>Current Followers</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {followersError && (
              <List.Item>
                <List.Content>
                  <List.Description>Something went wrong ...</List.Description>
                </List.Content>
              </List.Item>
            )}
            {followersLoading ? (
              <List.Item>
                <List.Content>
                  <List.Description>Loading ...</List.Description>
                </List.Content>
              </List.Item>
            ) : (
              <List relaxed>
                {followers !== undefined ? (
                  followers.map(item => (
                    <List.Item key={item.id}>
                      <List.Header>{item.follower}</List.Header>
                      <ListContent flaoted="right">
                        <Button>Accept</Button>
                        <Button>Reject</Button>
                      </ListContent>
                    </List.Item>
                  ))
                ) : (
                  <List.Item>
                    <List.Description>
                      Something is Not Right...
                    </List.Description>
                  </List.Item>
                )}
              </List>
            )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <Modal
        trigger={
          <Menu.Item
            name="Friends"
            active={activeItem === "Friends"}
            onClick={e => handleChange(e, "Friends")}
          >
            Friends
            <Label color="teal">y</Label>
          </Menu.Item>
        }
      >
        <Modal.Header>Current Friends</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {friendsError && (
              <List.Item>
                <List.Content>
                  <List.Description>Something went wrong ...</List.Description>
                </List.Content>
              </List.Item>
            )}
            {friendsLoading ? (
              <List.Item>
                <List.Content>
                  <List.Description>Loading ...</List.Description>
                </List.Content>
              </List.Item>
            ) : (
              <List relaxed>
                {friends !== undefined ? (
                  friends.map(item => (
                    <List.Item key={item.id}>
                      <ListContent>
                        <List.Header as="a">{item.id}</List.Header>
                        <List.Content floated="right">
                          <Button>Unfriend</Button>
                        </List.Content>
                      </ListContent>
                    </List.Item>
                  ))
                ) : (
                  <List.Item>
                    <List.Description>
                      Something is Not Right...
                    </List.Description>
                  </List.Item>
                )}
              </List>
            )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <Modal
        trigger={
          <Menu.Item
            name="Notifications"
            active={activeItem === "Notifications"}
            onClick={e => handleChange(e, "Notifications")}
          >
            Out-Going Requests
            <Label color="teal">z</Label>
          </Menu.Item>
        }
      >
        <Modal.Header>Out Going Requests</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {friendRequestsError && (
              <List.Item>
                <List.Content>
                  <List.Description>Something went wrong ...</List.Description>
                </List.Content>
              </List.Item>
            )}
            {friendRequestsLoading ? (
              <List.Item>
                <List.Content>
                  <List.Description>Loading ...</List.Description>
                </List.Content>
              </List.Item>
            ) : (
              <List relaxed>
                {friendRequests !== undefined ? (
                  friendRequests.map(item => (
                    <List.Item key={item.id}>
                      <ListContent>
                        <List.Header as="a">{item.id}</List.Header>
                        <List.Content floated="right">
                          <Button>Cancel</Button>
                        </List.Content>
                      </ListContent>
                    </List.Item>
                  ))
                ) : (
                  <List.Item>
                    <List.Description>
                      Something is Not Right...
                    </List.Description>
                  </List.Item>
                )}
              </List>
            )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

export default FriendshipButtons;
