import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Container,
  Input,
  TextArea,
  Select
} from "semantic-ui-react";
const typeOptions = [
  {
    key: "plaintext",
    text: "Plain Text",
    value: "plaintext"
  },
  {
    key: "markdown",
    text: "Mark Down",
    value: "markdown"
  }
];
const visabilityOptions = [
  {
    key: "public",
    text: "Public",
    value: "public"
  },

  {
    key: "foaf",
    text: "FOAF",
    value: "foaf"
  },
  {
    key: "friends",
    text: "Friends",
    value: "friends"
  },

  {
    key: "friendsonhost",
    text: "Friends on My Host",
    value: "friendsonhost"
  },
  {
    key: "myself",
    text: "Myself",
    value: "myself"
  }
];
const SignInForm = () => {
  const [ready, setReady] = useState(false);
  const [dataSet, setDataSet] = useState({
    title: "",
    categories: "",
    description: "",
    content: "",
    origin: "",
    source: "",
    author: "",
    error: "",
    loading: false,
    redirecting: false
  });
  const [contentType, setContentType] = useState("");
  const value = contentType;
  const handleChange = (e, { value }) => {
    setContentType(value);
  };
  const handleSubmit = () => {
    setReady(true);
    console.log(ready);
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
                label="Title"
                placeholder="Title"
              />
              <Form.Group width="equal">
                <Form.Field
                  required
                  id="post-category"
                  control={Input}
                  label="Category"
                  placeholder="Category"
                />
                <Form.Field
                  required
                  id="post-contentType"
                  control={Select}
                  options={typeOptions}
                  label="Content Type"
                  placeholder="Content Type"
                />
              </Form.Group>
            </Form.Group>
            <Form.Field
              id="post-description"
              control={TextArea}
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
              style={{ minHeight: "180px" }}
            />
            <Form.Group widths="equal">
              <Form.Field
                id="post-source"
                control={Input}
                label="Source"
                placeholder="Source"
              />
              <Form.Field
                id="post-origin"
                control={Input}
                label="Origin"
                placeholder="Origin"
              />
            </Form.Group>
            <Form.Group width="equal">
              <Form.Field
                required
                id="post-visibility"
                control={Select}
                options={visabilityOptions}
                label="Visible To"
              />
              <Button color="blue" fluid size="small" onClick={handleSubmit}>
                OK
              </Button>
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Container>
  );
};

export default SignInForm;
