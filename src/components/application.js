import './application.scss';
import Matrix from './matrix.js';
import React from 'react';

export default class Application extends React.Component {
  render() {
    return (
      <div>
        <div style={{minHeight: "100%"}}>
          <Matrix/>
        </div>
      </div>
    );
  }
}