import React, { useState } from 'react';
import { TestComponent } from './components/TestComponent/TestComponent';
// import 'modern-normalize';
import { Button } from './components/Button/Button';
import { Container } from './components/Container/Container';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';

export const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      {/* <Container> */}
      <Header />
      <main>
        <Hero />
      </main>
      {/* <p>Counter {counter}</p>
      <Button>Users</Button>
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
      </button> */}

      {/* <TestComponent /> */}
      {/* </Container> */}
    </>
  );
};
