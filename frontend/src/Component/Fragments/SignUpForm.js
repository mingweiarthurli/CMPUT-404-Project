import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider,
  Container,
  Popup
} from "semantic-ui-react";

const SignUpForm = () => {
  const [collection, setCollection] = useState({
    fname: "",
    lname: "",
    email: "",
    birthdate: "",
    passcode: "",
    confirm: "",
    success: false
  });

  const [problem, setProblem] = useState(0);
  const [checkerMsg, setCheckerMsg] = useState("");

  const handleChange = name => event => {
    //simply sets the states using input value as user types
    setCollection({ ...collection, [name]: event.target.value });
  };

  const handleClick = event => {
    // check if the form elements are okay
    let goto_field = 0;
    var {
      fname,
      lname,
      email,
      birthdate,
      passcode,
      confirm,
      success
    } = collection;
    if (fname.length > 60 || lname.length > 60) {
      goto_field = 1;
    } else if (!email.includes("@") || !email.includes(".")) {
      goto_field = 2;
    } else if (passcode !== confirm) {
      goto_field = 3;
    } else if (passcode.length < 6) {
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
          setCheckerMsg("name too long !!!");
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
      console.log("do something");
    }
  };

  return (
    <Container>
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
                  icon="address book"
                  iconPosition="left"
                  placeholder="First name"
                  required
                  onChange={handleChange("fname")}
                />
                <Form.Input
                  fluid
                  icon="address book outline"
                  iconPosition="left"
                  placeholder="Last name"
                  required
                  onChange={handleChange("lname")}
                />
                <Form.Input
                  fluid
                  icon="envelope"
                  iconPosition="left"
                  placeholder="Email address - (this is your username)"
                  required
                  onChange={handleChange("email")}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  required
                  onChange={handleChange("passcode")}
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
                <Popup
                  trigger={
                    <Form.Input
                      fluid
                      icon="birthday cake"
                      iconPosition="left"
                      placeholder="birthdate"
                      type="date"
                      required
                      onChange={handleChange("birthdate")}
                    />
                  }
                  content="please tell us your real birthdate, so we can suggest the right product to you"
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
