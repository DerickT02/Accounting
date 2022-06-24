import {BrowserRouter as Router, Route, Switch, BrowserRouter} from 'react-router-dom'
import Accounts from './components/Accounts.js'
import Account from './components/Account.js'
import './App.css';
import React from 'react';




function App() {
  return (
   
    <div className="App">
      <BrowserRouter>
        <Router>
          <Switch>
            <Route exact path = '/'  component ={Accounts}/>
            <Route path = '/:id' component = {Account}/>
          </Switch>
        </Router>
      </BrowserRouter>
    </div>
    
  );
}

export default App;

