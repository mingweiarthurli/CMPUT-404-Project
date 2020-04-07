import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Container,
  Input,
  TextArea,
  Select,
} from "semantic-ui-react";
import { addPost } from "../../ApiFetchers/posters/Axios";
import { SliceLocalID } from "../../ClassSupport/APICalls/SliceLocalID";
const typeOptions = [
  {
    key: "text/plain",
    text: "Plain Text",
    value: "text/plain",
  },
  {
    key: "text/markdown",
    text: "Mark Down",
    value: "text/markdown",
  },
  {
    key: "application/base64",
    text: "Base 64",
    value: "application/base64",
  },
  {
    key: "image/png;base64",
    text: "image/png;base64",
    value: "image/png;base64",
  },
  {
    key: "image/jpeg;based64",
    text: "image/jpeg;base64",
    value: "image/jpeg;base64",
  },
];
const visabilityOptions = [
  {
    key: "PUBLIC",
    text: "Public",
    value: "PUBLIC",
  },

  {
    key: "FOAF",
    text: "FOAF",
    value: "FOAF",
  },
  {
    key: "FRIENDS",
    text: "Friends",
    value: "FRIENDS",
  },

  {
    key: "PRIVATE",
    text: "Private",
    value: "PRIVATE",
  },
  {
    key: "SERVERONLY",
    text: "ServerOnly",
    value: "SERVERONLY",
  },
];
const NewPostForm = () => {
  const localToken = localStorage.getItem("currentToken");
  const [ready, setReady] = useState({
    error: false,
    redirecting: false,
  });
  const [dataSet, setDataSet] = useState({
    title: "",
    categories: "",
    description: "",
    contentType: "",
    content: "",
    author: {
      host: localStorage.getItem("currentHost"),
      github: localStorage.getItem("currentHost"),
    }, //
    visibility: "",
    visibleTo: "", //
    size: 0, //
    next: "", //
    unlisted: false, //
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setReady({ ...ready, error: false });
    const postIt = async () => {
      const res = await addPost(dataSet, localToken);
      console.log(res);
    };
    postIt();
  };
  const handleInput = (name) => (event) => {
    //simply sets the states using input value as user types
    setDataSet({ ...dataSet, [name]: event.target.value });
  };
  var contentSelect = dataSet.contentType;
  const handleTypeSelect = (e, { value }) => {
    setDataSet({ ...dataSet, contentType: value });
  };
  var visSelect = dataSet.visibility;
  const handleVisibilitySelect = (e, { value }) => {
    setDataSet({ ...dataSet, visibility: value });
  };
  return (
    <Container>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                required
                id="post-title"
                control={Input}
                onChange={handleInput("title")}
                label="Title"
                placeholder="Title"
              />
              <Form.Group width="equal">
                <Form.Field
                  required
                  id="post-category"
                  control={Input}
                  onChange={handleInput("categories")}
                  label="Category"
                  placeholder="Category"
                />
                <Form.Field
                  required
                  id="post-contentType"
                  control={Select}
                  options={typeOptions}
                  onChange={handleTypeSelect}
                  selection
                  value={contentSelect}
                  label="Content Type"
                  placeholder="Content Type"
                />
              </Form.Group>
            </Form.Group>
            <Form.Field
              id="post-description"
              control={TextArea}
              onChange={handleInput("description")}
              label="Description"
              placeholder="Description"
              style={{ maxHeight: "60px" }}
            />
            <Form.Field
              required
              id="post-Content"
              control={TextArea}
              label="Content"
              placeholder="Content"
              onChange={handleInput("content")}
              style={{ minHeight: "180px" }}
            />
            <Form.Group width="equal">
              <Form.Field
                required
                id="post-visibility"
                control={Select}
                options={visabilityOptions}
                onChange={handleVisibilitySelect}
                selection
                value={visSelect}
                label="Visible To"
              />
              <Button
                color="blue"
                fluid
                size="small"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                OK
              </Button>
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Container>
  );
};

export default NewPostForm;
