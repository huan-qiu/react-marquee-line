import React, {useEffect, useState} from 'react';
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

let i = 1;


const App = props => {
  const [list, setList] = useState(['this is the first item', template]);
  useEffect(() => {
    setInterval(() => {
       setList(prev => prev.concat(i++))
    }, 15000)
  }, [])

  return <Marquee list={list} />


}

export default App;
