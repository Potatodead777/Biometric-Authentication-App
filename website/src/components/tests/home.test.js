import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "../../pages/Homepage";
import "@testing-library/jest-dom/"; // Import the extend-expect module

test("renders sign in form", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  );
  const signInForm = getByTestId("home-first-h");
  expect(signInForm).toBeInTheDocument();
});

test("renders sign in form", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    const signInForm = getByTestId("home-first-p");
    expect(signInForm).toBeInTheDocument();
  });

  
  test("renders sign in form", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    const signInForm = getByTestId("home-second");
    expect(signInForm).toBeInTheDocument();
  });

  
  test("renders sign in form", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    const signInForm = getByTestId("home-image");
    expect(signInForm).toBeInTheDocument();
  });

  
  test("renders sign in form", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    const signInForm = getByTestId("home-image-2");
    expect(signInForm).toBeInTheDocument();
  });

  
  test("renders sign in form", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    const signInForm = getByTestId("home-mobile");
    expect(signInForm).toBeInTheDocument();
  });

  
  test("renders sign in form", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    const signInForm = getByTestId("home-first-p-2");
    expect(signInForm).toBeInTheDocument();
  });
  