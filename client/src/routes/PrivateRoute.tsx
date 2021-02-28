import React from "react";
import { Route } from 'wouter';
import { useLocation } from 'wouter';
import { useSelector } from '../reducer';

const PrivateRoute = ({ children: Children, ...rest }) =>{
  const system = useSelector(s => s.system);
  const [location, setLocation] = useLocation();
  if (system.status !== 'WalletConnected' && location !== '/') {
    setLocation('/');
  }else if(system.status === 'WalletConnected' && location == '/'){
    setLocation('/collections');
  }

  return (
    <Route {...rest}>
        {(props) => (
          <Children {...props}/>
        )}
    </Route>
  );
}

export default PrivateRoute;