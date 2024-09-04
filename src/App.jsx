import React from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { EmployeesSection } from './components/EmployeesSection/EmployeesSection';
import { Container } from './components/Container/Container';
import { FormSection } from './components/FormSection/FormSection';
import { UsersProvider } from './context/context';

export const App = () => {
  return (
    <>
      <UsersProvider>
        <Header />
        <main>
          <Hero />
          <Container>
            <EmployeesSection />
            <FormSection />
          </Container>
        </main>
      </UsersProvider>
    </>
  );
};
