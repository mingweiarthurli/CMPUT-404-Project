import React, { useState } from "react";
import { Segment, Button, Form } from "semantic-ui-react";
import { AdminImgUploader } from "../../ClassSupport/APICalls/AdminImgUploader";

const ImgUpload = ({ action }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imgName, setImgName] = useState("");
  const [successful, setSuccessful] = useState(false);
  const imgChange = e => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImgName(e.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    if (imageFile) {
      AdminImgUploader(imageFile);
    }
    setSuccessful(true);
  };

  const submissionSuccess = () => {
    if (successful === true) {
      console.log("submission success, image ready");
    }
  };
  return (
    <Segment key="img">
      <Form onSubmit={handleSubmit}>
        {submissionSuccess()}
        <input
          required
          onChange={imgChange}
          type="file"
          name="image"
          accept="image/*"
        />
        <Button type="submit" content="OK" />
      </Form>
    </Segment>
  );
};

export default ImgUpload;
