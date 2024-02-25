import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sign from '../../pages/Sign';
import '@testing-library/jest-dom/'; // Import the extend-expect module

test('renders sign in form', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sign />
    </MemoryRouter>
  );
  const signInForm = getByTestId('sign-form');
  expect(signInForm).toBeInTheDocument();
});

test('renders sign up form', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sign />
    </MemoryRouter>
  );
  const signInForm = getByTestId('sign-form-2');
  expect(signInForm).toBeInTheDocument();
});

test('renders sign up form', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sign />
    </MemoryRouter>
  );
  const signInForm = getByTestId('sign-form-email');
  expect(signInForm).toBeInTheDocument();
});

test('renders sign up form', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sign />
    </MemoryRouter>
  );
  const signInForm = getByTestId('sign-form-password');
  expect(signInForm).toBeInTheDocument();
});

test('renders sign up form', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sign />
    </MemoryRouter>
  );
  const signInForm = getByTestId('sign-form-up-password');
  expect(signInForm).toBeInTheDocument();
});

test('renders sign up form', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sign />
    </MemoryRouter>
  );
  const signInForm = getByTestId('sign-form-up-password');
  expect(signInForm).toBeInTheDocument();
});

test('renders sign up form', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sign />
    </MemoryRouter>
  );
  const signInForm = getByTestId('sign-form-2-button');
  expect(signInForm).toBeInTheDocument();
});

test('renders sign up form', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sign />
    </MemoryRouter>
  );
  const signInForm = getByTestId('sign-form-button');
  expect(signInForm).toBeInTheDocument();
});