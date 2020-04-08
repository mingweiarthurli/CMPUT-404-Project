//import {API} from '../../Routing/config';
const axios = require("axios");
//require('dotenv').config();

export const AdminImgUploader = imageFile => {
  const imgData = new FormData();
  imgData.append("imgData", imageFile);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  axios
    .post(`http://localhost:8000/upload`, imgData, config)
    .then(res => {
      console.log(res.json());
    })
    .catch(error => {});
};
