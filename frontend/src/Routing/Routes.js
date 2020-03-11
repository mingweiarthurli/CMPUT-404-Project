import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Private from "./Private";

import home from "../Component/master/home";
import signIn from "../Component/master/signIn";
import signUp from "../Component/master/signUp";
import posts from "../Component/master/posts";
import privateDashboard from "../Component/private/privateDashboard";

import adminInsert from "../Component/admin/adminInsert";
import adminActions from "../Component/admin/adminActions";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/signin" exact component={signIn} />
        <Route path="/signup" exact component={signUp} />
        <Route path="/posts" exact component={posts} />
        <Private path="/user/dashboard" exact component={privateDashboard} />
        <Private path="/admin/insert/" exact component={adminInsert} />
        <Private path="/admin/insert/:action" exact component={adminActions} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
