import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider,
  Container
} from "semantic-ui-react";
import { userSignup } from "../../ApiFetchers/posters/Axios";

const SignUpForm = () => {
  const [collection, setCollection] = useState({
    email: "",
    username: "",
    password: "",
    confirm: ""
  });

  const [problem, setProblem] = useState(0);
  const [checkerMsg, setCheckerMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = name => event => {
    //simply sets the states using input value as user types
    setCollection({ ...collection, [name]: event.target.value });
  };

  const handleClick = event => {
    // check if the form elements are okay
    let goto_field = 0;
    var { email, username, password, confirm } = collection;
    if (username.length > 60) {
      goto_field = 1;
    } else if (!email.includes("@") || !email.includes(".")) {
      goto_field = 2;
    } else if (password !== confirm) {
      goto_field = 3;
    } else if (password.length < 6) {
      goto_field = 4;
    } else {
      goto_field = 0;
    }
    if (goto_field === 0) {
      setProblem(goto_field);
      setCheckerMsg("");
    } else {
      setProblem(goto_field);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (problem !== 0) {
      console.log("has issues " + problem);
      switch (problem) {
        case 1:
          setCheckerMsg("username is too long !!!");
          break;
        case 2:
          setCheckerMsg("invalid email format !!!");
          break;
        case 4:
          setCheckerMsg("password needs to be at least 6 characters long !!!");
          break;
        default:
          setCheckerMsg("passwords do not match !!!");
          break;
      }
    }
    if (checkerMsg === "") {
      var { email, username, password } = collection;
      userSignup(email, username, password)
        .then(res => {
          console.log(res);
          setSuccess(true);
        })
        .catch(e => {
          setCheckerMsg("User Already Exists or Invalid Format");
          setSuccess(false);
        });
    }
  };

  const redir = () => {
    if (checkerMsg === "" && success === true) {
      return <Redirect to="/signin" />;
    }
  };

  return (
    <Container>
      {redir()}
      <Grid.Row>
        <Grid.Row>
          <Divider horizontal>You Are Gonna Be Rich!</Divider>
        </Grid.Row>
        <Grid.Row style={{ height: "100px" }}>
          <br />
        </Grid.Row>
        <Grid centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Sign Up Today
            </Header>
            <Segment>
              <Form size="large" onSubmit={handleSubmit}>
                <Form.Input
                  fluid
                  icon="envelope"
                  iconPosition="left"
                  placeholder="Email address - (this is not your username)"
                  required
                  onChange={handleChange("email")}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  required
                  onChange={handleChange("username")}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  required
                  onChange={handleChange("password")}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="please confirm your password"
                  type="password"
                  required
                  onChange={handleChange("confirm")}
                />
                <Button color="blue" fluid size="large" onClick={handleClick}>
                  Sign Up
                </Button>
                <br />
              </Form>
            </Segment>
            <Message>
              <h3 style={{ color: "red" }}>{checkerMsg}</h3>
            </Message>
            <Message>
              Already a Member? <a href="/signin">Sign In</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Grid.Row>
    </Container>
  );
};

export default SignUpForm;
