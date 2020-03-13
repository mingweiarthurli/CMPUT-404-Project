import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Private from "./Private";

import home from "../Pages/home";
import signIn from "../Pages/signIn";
import signUp from "../Pages/signUp";
import posts from "../Pages/posts";
import privateDashboard from "../Component/private/privateDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/signin" exact component={signIn} />
        <Route path="/signup" exact component={signUp} />
        <Route path="/posts" exact component={posts} />
        <Private path="/user/dashboard" exact component={privateDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
