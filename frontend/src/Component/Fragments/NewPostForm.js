import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Container,
  Input,
  TextArea,
  Select,
  Checkbox,
} from "semantic-ui-react";
import { addPost } from "../../ApiFetchers/posters/Axios";
import { getIdUsers } from "../../ApiFetchers/getters/Axios";
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
  //const localToken = localStorage.getItem("currentToken");
  const [refresh, setRefresh] = useState(false);
  const [special, setSpecial] = useState({
    cate: "",
  });
  const [dataSet, setDataSet] = useState({
    title: "",
    description: "",
    contentType: "",
    content: "",
    categories: [],
    author: {
      id: "",
      displayName: "",
      github: "",
      url: "",
      host: "",
    }, //
    visibility: "",
    visibleTo: [], //
    unlisted: false, //
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    /*if (dataSet.visibility === "PRIVATE"){

    } else {*/
    const postIt = async () => {
      //fill in the author data
      const getAuthor = await getIdUsers(SliceLocalID());
      let authorData = getAuthor.data;
      setDataSet({
        ...dataSet,
        author: {
          id: authorData.id,
          displayName: authorData.displayName,
          github: authorData.github,
          url: authorData.url,
          host: authorData.host,
        },
      });
      if (special.cate) {
        let splitString = special.cate.split(",");
        let i;
        let updater = [];
        for (i = 0; i < splitString.length; i++) {
          updater.push(splitString[i]);
        }
        setDataSet({ ...dataSet, categories: updater });
      }
    };
    postIt();
    let token = localStorage.getItem("currentToken");
    let res = addPost(dataSet, token);
    setRefresh(true);
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
  const specialInputs = (field) => (event) => {
    if (field === "categories") {
      setSpecial({ ...special, cate: event.target.value });
    } else {
      setDataSet({ ...dataSet, unlisted: true });
    }
  };
  const formReady = () => {
    if (refresh === true) {
      setRefresh(false);
      window.location.reload();
    }
  };
  return (
    <Container>
      {formReady()}
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
                  id="post-category"
                  control={Input}
                  onChange={specialInputs("categories")}
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
              <Form.Field
                id="post-unlist"
                control={Checkbox}
                onChange={specialInputs("unlisted")}
                label="Unlisted"
              />
              <Button
                color="blue"
                fluid
                size="small"
                type="submit"
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
