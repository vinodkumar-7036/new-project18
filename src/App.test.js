import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { useSelector, useDispatch } from "react-redux/es/hooks/useSelector";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("App component", () => {
  beforeEach(() => {
    useSelector.mockReturnValue([]);
    useDispatch.mockReturnValue(jest.fn());
  });

  test("renders login page by default", () => {
    render(<App />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("renders signup page when the route is '/sign-up'", () => {
    render(<App />, { wrapper: MemoryRouter, initialEntries: ["/sign-up"] });
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
  });

  test("renders UserData component when the route is '/user-data'", () => {
    render(<App />, { wrapper: MemoryRouter, initialEntries: ["/user-data"] });
    expect(screen.getByText(/user data/i)).toBeInTheDocument();
  });
});
