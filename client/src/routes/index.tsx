
import React from "react";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";
import { Switch, Route } from 'wouter';

const Routes = () => {
  return (
      <Switch>
        {routes.map(({ isPrivate, path, component}, id)=> {
          if (isPrivate) {

            return (
              <PrivateRoute path={path} key={id}>
                {component()}
              </PrivateRoute>
            );
          }
          return (
            <Route path={path} key={id}>
                {component()}
            </Route>
          );
        })}
      </Switch>
  );
};

export default Routes