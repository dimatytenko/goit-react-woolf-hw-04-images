import React, { Component } from 'react';
import { RevolvingDot } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <RevolvingDot
        type="Circles"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  }
}
