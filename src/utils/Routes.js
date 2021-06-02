import React, {} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Context} from "./ContextApi";
import Login from "../components/user/Login";
import Dashboard from "../components/user/Dashboard";
import Register from "../components/user/Register";
import AdminDashboard from "../components/admin/AdminDashboard";
import Payment from "../components/user/Payment";
import Page404 from "./Page404";

const Routes = () => {
  return (
    <Context>
      <Switch>
        <Redirect exact={true} from={'/'} to={'/login'}/>
        <Route exact={true} path={'/login'} component={Login}/>
        <Route exact={true} path={'/register'} component={Register}/>
        <Route exact={true} path={'/user/:username'} component={Dashboard}/>
        <Route exact={true} path={'/admin/:username'} component={AdminDashboard}/>
        <Route exact={true} path={'/user/:username/payment'} component={Payment}/>
        <Route exact={true} path={'*'} component={Page404}/>
      </Switch>
    </Context>
  );
};

export default Routes;
