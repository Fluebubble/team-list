import React, { useState } from 'react';
import { TestComponent } from './components/TestComponent/TestComponent';
// import 'modern-normalize';
import { Button } from './components/Button/Button';
import { Container } from './components/Container/Container';
import { Menu } from './components/Header/Header';

export const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <Container>
      <Menu />
      <p>Counter {counter}</p>
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
      </button>

      <TestComponent />
    </Container>
  );
};
