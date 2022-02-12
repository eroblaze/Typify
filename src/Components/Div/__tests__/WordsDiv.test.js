import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Div from "../WordsDiv";

const words = "what is the meaning of this?";
const pastColor = ["red", "green", "blue"];

describe("WordsDiv Component", () => {
  beforeEach(() => {
    render(<Div words={words} pastColor={pastColor} />);
  });

  test("Test the WordsDiv component renders", () => {
    const divEl = screen.getByTestId("words-div");
    expect(divEl).toBeInTheDocument();
  });

  test("Test that it displays the words array to the screen", () => {
    const divEl = screen.getByText("w");
    expect(divEl).toBeInTheDocument();
  });

  test("Test that the colors of the characters can change", () => {
    const divEl = screen.getByText("w");
    expect(divEl).toHaveStyle("color: red");
  });
});
