import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Private from "./Private";

import home from "../Pages/home";
import signIn from "../Pages/signIn";
import signUp from "../Pages/signUp";
import posts from "../Pages/posts";
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
        <Private path="/action/" exact component={adminInsert} />
        <Private path="/admin/insert/:action" exact component={adminActions} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
