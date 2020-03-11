import {API} from '../../Routing/config';
const axios = require("axios");
require('dotenv').config();

export const DeleteCategory = (ValueQL) => {
    let parsed = ValueQL.slice(1,-1);
    axios.delete(`${API}/deletecategory/${parsed}`)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });    
};

export const DeleteProduct = (ValueQL) => {

} 

export const DeletePromotion = (ValueQL) => {

}