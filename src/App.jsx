import React, { useState } from 'react';

export const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <p>Counter {counter}</p>

      <button
        type="button"
        onClick={() => setCounter((prevState) => prevState + 1)}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => setCounter((prevState) => prevState - 1)}
      >
        -
      </button>
    </>
  );
};
