import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PasswordBox from "../../components/PasswordBox";
import "@testing-library/jest-dom/"; // Import the extend-expect module

const text = {
  website: "https://example.com",
  password: 'testpassword',
  id: '4',
};

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PasswordBox text={text} />
    </MemoryRouter>
  );
  const signInForm = getByTestId("password-website");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PasswordBox text={text} />
    </MemoryRouter>
  );
  const signInForm2 = getByTestId("password-website-2");
  expect(signInForm2).toBeInTheDocument();
});
test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PasswordBox text={text} />
    </MemoryRouter>
  );
  const signInForm = getByTestId("password-title");
  expect(signInForm).toBeInTheDocument();
});
test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PasswordBox text={text} />
    </MemoryRouter>
  );
  const signInForm = getByTestId("password-info");
  expect(signInForm).toBeInTheDocument();
});
test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PasswordBox text={text} />
    </MemoryRouter>
  );
  const signInForm = getByTestId("password-buttons");
  expect(signInForm).toBeInTheDocument();
});
test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PasswordBox text={text} />
    </MemoryRouter>
  );
  const signInForm = getByTestId("password-request");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PasswordBox text={text} />
    </MemoryRouter>
  );
  const signInForm = getByTestId("password-edit");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PasswordBox text={text} />
    </MemoryRouter>
  );
  const signInForm = getByTestId("password-delete");
  expect(signInForm).toBeInTheDocument();
});
