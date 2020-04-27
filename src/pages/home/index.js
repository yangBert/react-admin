import React, { Component } from "react";
import Plot1 from './components/Plot1';
import Plot2 from './components/Plot2';
import Plot3 from './components/Plot3';
import Plot4 from './components/Plot4';
import Plot5 from './components/Plot5';
import Plot6 from './components/Plot6';
import Plot7 from './components/Plot7';
class Home extends Component {
  render() {
    return (
      <div className="clearfix">
        <Plot1 />
        <Plot2 />
        <Plot3 />
        <Plot4 />
        <Plot5 />
        <Plot6 />
        <Plot7 />
      </div>
    );
  }
}

export default Home;
