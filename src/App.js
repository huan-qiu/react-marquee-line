import React from 'react';
import './App.css';
import Marquee from './Marquee';

const template = (
  <span
    onClick={() => {
      console.log('clicked');
    }}
  >
    click me
  </span>
);

const list = ['this is the first item', template]

const App = props => {
  return <Marquee list={list}/>
}

export default App;