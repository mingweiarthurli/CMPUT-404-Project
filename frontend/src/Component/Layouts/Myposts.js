import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Form,
  FormGroup,
  List,
  Modal,
  Header,
  Label,
  Divider,
  Button,
  TextArea,
  Item,
} from "semantic-ui-react";
import {
  getDefaultVisiblePosts,
  getIdVisiblePosts,
} from "../../ApiFetchers/getters/Axios";
const Myposts = () => {
  const token = localStorage.getItem("currentToken");
  const user = localStorage.getItem("currentUser");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pData, setPData] = useState([]);
  useEffect(() => {
    const myListView = async () => {
      setError(false);
      setLoading(true);
      try {
        let res = await getIdVisiblePosts(user, token).then((res) => {
          console.log(res.data);
        });
        setPData(res.data);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };
    myListView();
  }, []);
  return (
    <Fragment>
      <List.Header>
        <strong>My Posts</strong>
      </List.Header>
      <Divider></Divider>
      {error && (
        <List.Item>
          <List.Content>
            <List.Description>Something went wrong ...</List.Description>
          </List.Content>
        </List.Item>
      )}
      {loading ? (
        <List.Item>
          <List.Content>
            <List.Description>Loading ...</List.Description>
          </List.Content>
        </List.Item>
      ) : (
        <Item.Group divided>
          {pData.map((special) => (
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
                    </Grid.Row>
                  </Grid>
                </Modal>
                <Item.Description>{special.description}</Item.Description>
                <Item.Extra>
                  <Label.Group attached="bottom left" size="mini">
                    <Label icon="globe" content={special.contentType} />
                    <Label
                      icon="sort alphabet down"
                      content={special.categories}
                    />
                  </Label.Group>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
    </Fragment>
  );
};

export default Myposts;
