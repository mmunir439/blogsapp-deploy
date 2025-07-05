'use client';

import React from 'react';

const Counter = () => {
  let [count, setCount] = React.useState(5);
  // let count = 5;
  // const setCount = (newCount) => {
  //   count = newCount;
  //   console.log(count);
  // }

  // var count = 20;
  const inc = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    console.log(count);
  }

  return (
    <>
    <h1>Counter Component</h1>
    <div style={{display: "flex", alignItems: "center"}}>
      <button 
        onClick={() => setCount(count - 1)}
        disabled={count <= 1}
      >Decrement</button>
      <h4>{count}</h4>
      <button 
        onClick={inc}
        disabled={count >= 10}
      >Increment</button>
    </div>
    </>
  )
}

export default Counter;