import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  Container,
  Grid,
  List,
  Button,
  Icon,
  Item,
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
  getDefaultVisiblePosts,
  viewablePosts,
} from "../../ApiFetchers/getters/Axios";

const SplitContainer = () => {
  const [authorData, setAuthorData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [authorLoading, setAuthorLoading] = useState(false);
  const [authorError, setAuthorError] = useState(false);
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
        const postFetcher = await viewablePosts();
        setPostData(postFetcher.data);
      } catch (error) {
        setPostError(true);
      }
      setPostLoading(false);
    };
    getPosts();
    getAuthors();
  }, []);
  const onAuthorClick = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Grid column={3} divided>
        <Grid.Row>
          <Grid.Column width={2} textAlign="center">
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
                {authorData.map((item) => (
                  <List.Item key={item.id}>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                    />
                    <List.Content>
                      <List.Header>{item.displayName}</List.Header>
                      <Button animated size="tiny">
                        <Button.Content visible>
                          {item.host === localStorage.getItem("currentHost") ? (
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
                ))}
              </List>
            )}
          </Grid.Column>
          <Grid.Column width={6}>
            <List.Header>
              <strong>Posts I Can See</strong>
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
                                  {post.comments.map((key) => (
                                    <Card
                                      style={{ backgroundColor: "teal" }}
                                      key={key.id}
                                    >
                                      <Card.Content>
                                        <Feed>
                                          <Feed.Event>
                                            <Feed.Content>
                                              <Feed.Date>
                                                {key.author.displayName} @{" "}
                                                {key.published}
                                              </Feed.Date>
                                              <Feed.Content>
                                                {key.comment}
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
          <Grid.Column width={6}>
            <div></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default SplitContainer;
