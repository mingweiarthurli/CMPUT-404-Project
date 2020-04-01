import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Form,
  FormGroup,
  Header,
  Divider,
  Button,
  TextArea
} from "semantic-ui-react";
import { patchProfile } from "../../ApiFetchers/putters/Axios";
import { SliceLocalID } from "../../ClassSupport/APICalls/SliceLocalID";
const ProfileForm = props => {
  let ph = props.props;
  const [homeNav, setHomeNav] = useState(false);
  const [profile, setProfile] = useState({
    firstname: ph.firstname,
    lastname: ph.lastname,
    displayName: ph.displayName,
    email: ph.email,
    github: ph.github,
    bio: ph.bio,
    url: ph.url,
    id: ph.id,
    host: ph.host
  });
  const handleChange = name => e => {
    e.preventDefault();
    setProfile({ ...profile, [name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(profile);
    patchProfile(SliceLocalID(), profile);
  };
  const handleRedir = e => {
    e.preventDefault();
    setHomeNav(true);
  };
  const redir = () => {
    if (homeNav === true) {
      return <Redirect to="/" />;
    }
  };
  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={3}>
          {redir()}
          <Button
            content="Homepage"
            icon="left arrow"
            labelPosition="left"
            onClick={e => {
              handleRedir(e);
            }}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Header as="h1">My Profile</Header>
          <Divider horizontal>Basics</Divider>
          <Form onSubmit={handleSubmit}>
            <FormGroup widths="equal">
              <Form.Input
                label="first name"
                fluid
                placeholder={ph.firstname}
                onChange={handleChange("firstname")}
              />
              <Form.Input
                label="last name"
                fluid
                placeholder={ph.lastname}
                onChange={handleChange("lastname")}
              />
              <Form.Input
                label="display name"
                fluid
                placeholder={ph.displayName}
                onChange={handleChange("displayName")}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Form.Input
                label="email"
                fluid
                placeholder={ph.email}
                onChange={handleChange("email")}
              />
              <Form.Input
                label="github"
                fluid
                placeholder={ph.github}
                onChange={handleChange("github")}
              />
            </FormGroup>
            <TextArea
              placeholder={ph.bio}
              label="my bio"
              onChange={handleChange("bio")}
            />
            <Divider horizontal>Advanced</Divider>
            <Header as="h5" textAlign="center">
              ID: {ph.id}
            </Header>
            <Header as="h5" textAlign="center">
              HOST: {ph.host}
            </Header>
            <Header as="h5" textAlign="center">
              URL: {ph.url}
            </Header>
            <Button
              type="submit"
              size="medium"
              color="teal"
              floated="right"
              style={{ marginTop: "15px" }}
            >
              OK
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={1}>
          <div></div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProfileForm;
