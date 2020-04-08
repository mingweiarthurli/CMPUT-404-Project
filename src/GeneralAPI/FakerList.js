import React, { useState } from "react";
import Faker from "faker";

const fakedata = () => {
  var users = [];
  for (let i = 0; i < 50; i++) {
    const user = {
      name: Faker.internet.userName(),
      email: Faker.internet.email(),
      avatar: Faker.internet.avatar()
    };
    users.push(user);
  }
  return users;
};
const GetList = () => {
  const [userList, setUserList] = useState(null);

  console.log(userList);
};
