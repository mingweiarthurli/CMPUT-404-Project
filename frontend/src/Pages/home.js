import React, { Fragment } from "react";
import BottomBar from "../Component/Fragments/BottomBar";
import TopBar from "../Component/Fragments/TopBar";
import SplitContainer from "../Layouts/SpiltContainer";

const home = () => (
  <Fragment>
    <TopBar />
    <SplitContainer />
    <BottomBar />
  </Fragment>
);

export default home;
