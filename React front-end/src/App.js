
import { Button, TextField } from "@material-ui/core";

import Home from "./pages/Home";



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { AuthProvider } from "./store/AuthContext"



//const BigInteger = require('jsbn').BigInteger;
//import BigInteger from 'BigInt'



function App() {
    return (
      <Router>
        
          
        <div >
           
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
             
              
            </Switch>
            
          </div>
        
      </Router>
    );
  }
  
  export default App;
