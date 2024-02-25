import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../../pages/Layout";
import Profile from "../../pages/Profile"
import "@testing-library/jest-dom/"; // Import the extend-expect module

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  );
  const signInForm = getByTestId("layout-image");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  );
  const signInForm = getByTestId("layout-password");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  );
  const signInForm = getByTestId("layout-profile");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  );
  const signInForm = getByTestId("layout-about");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  );
  const signInForm = getByTestId("layout-question");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  );
  const signInForm = getByTestId("layout-signin");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const signInForm = getByTestId("profile-sign");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const signInForm = getByTestId("profile-title");
  expect(signInForm).toBeInTheDocument();
});


test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const signInForm = getByTestId("profile-number");
  expect(signInForm).toBeInTheDocument();
});


test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const signInForm = getByTestId("profile-delete");
  expect(signInForm).toBeInTheDocument();
});
