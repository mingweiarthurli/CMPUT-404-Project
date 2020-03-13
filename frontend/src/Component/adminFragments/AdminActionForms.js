import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Dropdown,
  Segment,
  Container,
  Grid,
  Divider,
  Header,
  Form,
  Input,
  Button
} from "semantic-ui-react";
import { AdminInsertSwitch } from "../../ClassSupport/AdminInsertSwitch";
import { AdminImgUploader } from "../../ClassSupport/APICalls/AdminImgUploader";
import { AdminMethodSwitch } from "../../ClassSupport/AdminMethodSwitch";
import { AdminFetchSwitch } from "../../ClassSupport/AdminFetchSwitch";

const AdminActionForms = ({ action }) => {
  const [formGroup] = useState(AdminInsertSwitch(action));
  const [inp, setInp] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [successful, setSuccessful] = useState(false);

  const productIDs = [
    {
      key: "opt1",
      text: "option @ 1",
      value: "option_1"
    },
    {
      key: "opt2",
      text: "option @ 2",
      value: "option_2"
    }
  ];
  const handleChange = event => {
    setInp({ ...inp, [event.target.name]: event.target.value });
  };
  const idChange = (e, { value }) => {
    setInp({ ...inp, product_id: value });
  };
  const imgChange = e => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setInp({ ...inp, img: e.target.files[0].name });
    }
  };

  const handleSubmit = () => {
    if (imageFile) {
      AdminImgUploader(imageFile);
    }
    const method = AdminMethodSwitch(action);
    AdminFetchSwitch(method, inp, action);
    setSuccessful(true);
  };

  const submissionSuccess = () => {
    if (successful === true) {
      return <Redirect to="/action" />;
    }
  };

  return (
    <Container>
      <Grid centered>
        <Grid.Row>
          <Link to="/action" style={{ marginTop: "80px" }}>
            Go Back
          </Link>
        </Grid.Row>
        <Grid.Row>
          <Header as="h2">{action}</Header>
        </Grid.Row>
        <Grid.Row>
          <Form
            onSubmit={handleSubmit}
            style={{ minWidth: "300px" }}
            id="currentForm"
          >
            {submissionSuccess()}
            {formGroup.map(item =>
              item === "product_id" ? (
                <Dropdown
                  fluid
                  onChange={idChange}
                  options={productIDs}
                  key="product_id"
                  placeholder="select Product ID"
                  selection
                  value={formGroup.product_id}
                  required
                />
              ) : item === "img" ? (
                <Segment key="img">
                  <input
                    required
                    onChange={imgChange}
                    type="file"
                    name="image"
                    accept="image/*"
                  />
                </Segment>
              ) : (
                <Form.Field
                  required
                  key={item}
                  name={item}
                  control={Input}
                  placeholder={item}
                  onChange={e => handleChange(e)}
                ></Form.Field>
              )
            )}
            <Divider />
            <Button fluid content="OK" type="submit" />
          </Form>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default AdminActionForms;
