import React from 'react'
import TestPage from './Containers/TestPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App=() =>{
  return (
    <Router>
        <Switch>
            <Route path='/' component={()=><TestPage title="TestPage"/>} />
        </Switch>
    </Router>
  );
}

export default App;
