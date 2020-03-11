import {API} from '../../Routing/config';
const axios = require("axios");
require('dotenv').config();

export const AddCategory = (ValueQL) => {
    axios.post(`${API}/admin/addcategory`, {body: ValueQL})
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });    
};

export const AddProduct = (ValueQL) => {
    axios.post(`${API}/admin/addproduct`, {body: ValueQL})
    .then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error)
    })
}

export const AddPromotion = (ValueQL) => {
  console.log(ValueQL)
  axios.post(`${API}/admin/addpromotion`, {body: ValueQL})
  .then((res)=>{
    console.log(res)
  }).catch((error)=>{
    console.log(error)
  })
}