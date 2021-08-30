import React, {  useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import AuthScreen from './components/Auth';
import {AuthContext} from './Context/auth-context';

const App = props => {
  const AuthCTX=useContext(AuthContext);
  return (
    <>
  {
    AuthCTX.isAuth?<Ingredients />:<AuthScreen/>
  }
  
  </>
  );
};

export default App;
