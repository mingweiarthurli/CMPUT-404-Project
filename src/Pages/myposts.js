import React, { Fragment } from "react";
import BottomBar from "../Component/Fragments/BottomBar";
import TopBar from "../Component/Fragments/TopBar";
import Myposts from "../Component/Layouts/Myposts";

const home = () => (
  <Fragment>
    <TopBar />
    <Myposts />
    <BottomBar />
  </Fragment>
);

export default home;
