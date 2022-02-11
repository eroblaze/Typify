import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../InputField";

describe("InputField Component", () => {
  beforeEach(() => {
    render(<Input />);
  });
  test("Test the input field renders to the dom", () => {
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toBeTruthy();
  });

  test("Test that the input field is empty when initially rendered", () => {
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toHaveValue("");
  });

  test("Test the user sees what he/she is typing", () => {
    const inputEl = screen.getByRole("textbox");
    fireEvent.change(inputEl, { target: { value: "paul" } });
    expect(inputEl).toHaveValue("paul");
  });

  test("Test that the input field once rendered has immediate focus", () => {
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toHaveFocus;
  });
});
