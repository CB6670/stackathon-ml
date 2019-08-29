import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import inputForm from './inputForm';

const App = () => {
      return (
          <HashRouter>
              <Route exact path = "/" component = {inputForm} />
          </HashRouter>
      )
}

export default App;
