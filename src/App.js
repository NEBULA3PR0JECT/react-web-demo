import React from 'react';

import { Header } from './containers';
import { Brand, Navbar } from './components';

import './App.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Brand />
    {/* <WhatGPT3 {pipelineId}/> */}
  </div>
);

export default App;
