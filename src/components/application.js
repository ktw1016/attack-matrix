import './application.scss';
import Matrix from './matrix.js';
import ATP from './ATP.js';
import AddATP from './addATP.js';
import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

export default class Application extends React.Component {
  render() {
    return (
      <div>
        <div style={{ minHeight: "100%" }}>
          <Switch>
            <Route exact path="/" component={Matrix} />
            <Route exact path="/addatp" component={AddATP}></Route>
            <Route exact path="/:id" render={ (props) => <ATP {...props} /> } />
          </Switch>
        </div>
      </div>
    );
  }
}
