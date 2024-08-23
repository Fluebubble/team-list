import React from 'react';
// import { TestComponent } from './components/TestComponent/TestComponent';
// import 'modern-normalize';
// import { Button } from './components/Button/Button';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { EmployeesSection } from './components/EmployeesSection/EmployeesSection';
import { Container } from './components/Container/Container';
import { FormSection } from './components/FormSection/FormSection';

export const App = () => {
  // const [counter, setCounter] = useState(0);

  return (
    <>
      {/* <Container> */}
      <Header />
      <main>
        <Hero />
        <Container>
          <EmployeesSection />
          <FormSection />
        </Container>
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
