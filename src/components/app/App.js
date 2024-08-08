import React from 'react';
import StartLogo from '../startLogo/StartLogo';
import Header from '../header/Header';
import Collage from '../collage/Collage';
import FormPage from '../formPage/FormPage';
import UniversityPage from '../universityPage/UniversityPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>

          <Route exact path='/'>
            <Header />
            <StartLogo />
            <Collage />
          </Route>

          <Route exact path="/test" component={FormPage} />
          <Route exact path="/univPage" component={UniversityPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
