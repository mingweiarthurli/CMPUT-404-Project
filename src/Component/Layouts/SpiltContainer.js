import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  Container,
  Grid,
  List,
  Button,
  Icon,
  Item,
  Form,
  Image,
  Card,
  Feed,
  Label,
  Modal,
  Divider,
  ModalDescription,
} from "semantic-ui-react";
import axios from "axios";
import {
  getAllUsers,
  getPublicPosts,
  getIdUsers,
  getDefaultVisiblePosts,
  getIdVisiblePosts,
} from "../../ApiFetchers/getters/Axios";
import { startFollowing, addComments } from "../../ApiFetchers/posters/Axios";

const SplitContainer = () => {
  const localHost = localStorage.getItem("currentHost");
  const current = localStorage.getItem("currentUser");
  const currentURL = localStorage.getItem("currentURL");
  const [onComment, setOnComment] = useState("");
  const [cmtID, setCmtID] = useState("");
  const [authorData, setAuthorData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [sPostData, setSPostData] = useState([]);
  const [authorLoading, setAuthorLoading] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [sPostLoading, setSPostLoading] = useState(false);
  const [sPostError, setSPostError] = useState(false);
  const [postError, setPostError] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  useEffect(() => {
    const getAuthors = async () => {
      setAuthorError(false);
      setAuthorLoading(true);
      try {
        const authorFetcher = await getAllUsers(); //get data from api's url
        setAuthorData(authorFetcher.data);
      } catch (error) {
        setAuthorError(true);
      }
      setAuthorLoading(false);
    };
    const getPosts = async () => {
      setPostError(false);
      setPostLoading(true);
      try {
        const postFetcher = await getPublicPosts();
        setPostData(postFetcher.data);
      } catch (error) {
        setPostError(true);
      }
      setPostLoading(false);
    };
    const getStatusPosts = async () => {
      setSPostError(false);
      setSPostLoading(true);
      try {
        const sFetcher = await getDefaultVisiblePosts(
          localStorage.getItem("currentToken")
        );
        setSPostData(sFetcher.data);
      } catch (error) {
        setSPostError(true);
      }
      setSPostLoading(false);
    };
    getPosts();
    getAuthors();
    getStatusPosts();
  }, []);
  //Start Following {uid}.
  const onAuthorClick = (e, id, name, host, url) => {
    e.preventDefault();
    let formatter = {
      author: {
        id: currentURL,
        host: localHost,
        displayName: current,
        url: currentURL,
      },
      friend: {
        id: id,
        host: host,
        displayName: name,
        url: url,
      },
    };
    const followCaller = async (author, friend) => {
      //console.log(JSON.stringify(data));
      const response = await startFollowing(author, friend);
    };
    followCaller(formatter.author, formatter.friend);
  };
  const handleComment = (id) => (e) => {
    setCmtID(id);
    setOnComment(e.target.value);
  };
  const handlePostComment = async (e) => {
    e.preventDefault();
    let cmtBody = {
      comment: onComment,
      contentType: "text/plain",
    };
    let cmtRes = await addComments(
      cmtID,
      cmtBody,
      localStorage.getItem("currentToken")
    ).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
    //console.log(cmtBody);
    //console.log(cmtID);
  };
  return (
    <Container>
      <Grid column={3} divided>
        <Grid.Row>
          <Grid.Column
            width={2}
            style={{
              textAlign: "center",
            }}
          >
            <List.Header>
              <strong>Available Authors</strong>
            </List.Header>
            {authorError && (
              <List.Item>
                <List.Content>
                  <List.Description>Something went wrong ...</List.Description>
                </List.Content>
              </List.Item>
            )}
            {authorLoading ? (
              <List.Item>
                <List.Content>
                  <List.Description>Loading ...</List.Description>
                </List.Content>
              </List.Item>
            ) : (
              <List divided relaxed>
                {authorData.map((item) =>
                  item.displayName !== current ? (
                    <List.Item key={item.id}>
                      <Image
                        avatar
                        src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                      />
                      <List.Content>
                        <List.Header>{item.displayName}</List.Header>
                        <Button
                          animated
                          size="tiny"
                          onClick={(e) => {
                            onAuthorClick(
                              e,
                              item.id,
                              item.displayName,
                              item.host,
                              item.url
                            );
                          }}
                        >
                          <Button.Content visible>
                            {item.host === localHost ? (
                              <Icon name="registered" />
                            ) : (
                              <Icon name="registered outline" />
                            )}
                            Follow
                          </Button.Content>
                          <Button.Content hidden>
                            <Icon name="arrow right" />
                          </Button.Content>
                        </Button>
                      </List.Content>
                    </List.Item>
                  ) : (
                    <p key={item.id}></p>
                  )
                )}
              </List>
            )}
          </Grid.Column>
          <Grid.Column width={6}>
            <List.Header>
              <strong>Posts For Me</strong>
            </List.Header>
            <Divider></Divider>
            {sPostError && (
              <List.Item>
                <List.Content>
                  <List.Description>Something went wrong ...</List.Description>
                </List.Content>
              </List.Item>
            )}
            {sPostLoading ? (
              <List.Item>
                <List.Content>
                  <List.Description>Loading ...</List.Description>
                </List.Content>
              </List.Item>
            ) : (
              <Item.Group divided>
                {sPostData.map((special) =>
                  special.visibility === "PUBLIC" ? (
                    <p key={special.id}></p>
                  ) : (
                    <Item key={special.id}>
                      <Item.Content>
                        <Item.Extra>
                          <Label ribbon="right" color={"orange"}>
                            {special.visibility}
                          </Label>
                        </Item.Extra>
                        <Modal
                          trigger={
                            <Item.Header
                              as="a"
                              style={{
                                color: "lightseagreen",
                                textAlign: "center",
                              }}
                            >
                              {special.title}
                            </Item.Header>
                          }
                        >
                          <Modal.Header style={{ textAlign: "center" }}>
                            {special.title}
                          </Modal.Header>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={10}>
                                <Modal.Content>
                                  <Modal.Description
                                    style={{
                                      minHeight: "150px",
                                      textAlign: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    {special.content}
                                  </Modal.Description>
                                  <Divider></Divider>
                                  <Modal.Description
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    posted at {special.published} in{" "}
                                    {special.categories} sections
                                  </Modal.Description>
                                </Modal.Content>
                              </Grid.Column>
                              <Grid.Column width={6}>
                                <Modal.Content>
                                  <Modal.Header>
                                    <strong>Comments</strong>
                                    <br />
                                  </Modal.Header>
                                  <Divider></Divider>
                                  <ModalDescription>
                                    {special.comments.map((cmmt) => (
                                      <Card
                                        style={{ backgroundColor: "teal" }}
                                        key={cmmt.id}
                                      >
                                        <Card.Content>
                                          <Feed>
                                            <Feed.Event>
                                              <Feed.Content>
                                                <Feed.Date>
                                                  {cmmt.author.displayName} @{" "}
                                                  {cmmt.published}
                                                </Feed.Date>
                                                <Feed.Content>
                                                  {cmmt.comment}
                                                </Feed.Content>
                                              </Feed.Content>
                                            </Feed.Event>
                                          </Feed>
                                        </Card.Content>
                                      </Card>
                                    ))}
                                  </ModalDescription>
                                </Modal.Content>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Modal>
                        <Item.Description>
                          {special.description}
                        </Item.Description>
                        <Item.Extra>
                          <Label.Group attached="bottom left" size="mini">
                            <Label icon="globe" content={special.contentType} />
                            <Label
                              icon="sort alphabet down"
                              content={special.categories}
                            />
                            <Label
                              icon="comment"
                              content={special.comments.length}
                            />
                          </Label.Group>
                        </Item.Extra>
                        <Item.Meta>
                          created @ {special.published} by{" "}
                          <a
                            style={{ color: "teal" }}
                            href={special.author.url}
                          >
                            {special.author.displayName}
                          </a>
                        </Item.Meta>
                      </Item.Content>
                    </Item>
                  )
                )}
              </Item.Group>
            )}
          </Grid.Column>
          <Grid.Column width={6}>
            <List.Header>
              <strong>Public Posts</strong>
            </List.Header>
            <Divider></Divider>
            {postError && (
              <List.Item>
                <List.Content>
                  <List.Description>Something went wrong ...</List.Description>
                </List.Content>
              </List.Item>
            )}
            {postLoading ? (
              <List.Item>
                <List.Content>
                  <List.Description>Loading ...</List.Description>
                </List.Content>
              </List.Item>
            ) : (
              <Item.Group divided>
                {postData.map((post) => (
                  <Item key={post.id}>
                    <Item.Content>
                      <Item.Extra>
                        <Label
                          ribbon="right"
                          color={
                            post.visibility === "PUBLIC"
                              ? "blue"
                              : "midnightblue"
                          }
                        >
                          {post.visibility}
                        </Label>
                      </Item.Extra>
                      <Modal
                        trigger={
                          <Item.Header
                            as="a"
                            style={{
                              color: "lightseagreen",
                              textAlign: "center",
                            }}
                          >
                            {post.title}
                          </Item.Header>
                        }
                      >
                        <Modal.Header style={{ textAlign: "center" }}>
                          {post.title}
                        </Modal.Header>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={10}>
                              <Modal.Content>
                                <Modal.Description
                                  style={{
                                    minHeight: "150px",
                                    textAlign: "center",
                                    marginTop: "10px",
                                  }}
                                >
                                  {post.content}
                                </Modal.Description>
                                <Divider></Divider>
                                <Modal.Description
                                  style={{
                                    maxHeight: "20px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  posted at {post.published} in{" "}
                                  {post.categories} sections
                                </Modal.Description>
                              </Modal.Content>
                            </Grid.Column>
                            <Grid.Column width={6}>
                              <Modal.Content>
                                <Modal.Header>
                                  <strong>Comments</strong>
                                  <br />
                                </Modal.Header>
                                <Divider></Divider>
                                <ModalDescription>
                                  {post.comments.map((cmt) => (
                                    <Card
                                      style={{ backgroundColor: "teal" }}
                                      key={cmt.id}
                                    >
                                      <Card.Content>
                                        <Feed>
                                          <Feed.Event>
                                            <Feed.Content>
                                              <Feed.Date>
                                                {cmt.author.displayName} @{" "}
                                                {cmt.published}
                                              </Feed.Date>
                                              <Feed.Content>
                                                {cmt.comment}
                                              </Feed.Content>
                                            </Feed.Content>
                                          </Feed.Event>
                                        </Feed>
                                      </Card.Content>
                                    </Card>
                                  ))}
                                  <Form onSubmit={handlePostComment}>
                                    <Form.Input
                                      fluid
                                      placeholder="add a comment"
                                      onChange={handleComment(post.id)}
                                    />
                                    <Form.Button type="submit">
                                      Post
                                    </Form.Button>
                                  </Form>
                                </ModalDescription>
                              </Modal.Content>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Modal>
                      <Item.Description>{post.description}</Item.Description>
                      <Item.Extra>
                        <Label.Group attached="bottom left" size="mini">
                          <Label icon="globe" content={post.contentType} />
                          <Label
                            icon="sort alphabet down"
                            content={post.categories}
                          />
                          <Label
                            icon="comment"
                            content={post.comments.length}
                          />
                        </Label.Group>
                      </Item.Extra>
                      <Item.Meta>
                        created @ {post.published} by{" "}
                        <a style={{ color: "teal" }} href={post.author.url}>
                          {post.author.displayName}
                        </a>
                      </Item.Meta>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default SplitContainer;
