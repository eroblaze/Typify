import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Type from "../Type";

const words = "this is the typing test";

describe("Type main Component", () => {
  // There is no need to test if this component is rendered because this is the main
  // component which encompasses the other two and since I've already checked for the
  // existence of the other two, there is no need to check for this.

  beforeEach(() => {
    render(<Type wordsToDisplay={words} />);
  });

  test("Test when component initially renders, all the text are black", () => {
    const firstSpan = screen.getByTestId("div0");
    const secondSpan = screen.getByTestId("div1");
    expect(firstSpan).toHaveStyle("color: ''");
    expect(secondSpan).toHaveStyle("color: ''");
  });

  test("Test that as the user types, the GREEN color shows in the Div if he/she is correct", () => {
    const inputEl = screen.queryByTestId("main-input");
    const firstSpan = screen.getByTestId("div0");

    expect(firstSpan).toHaveStyle("color: ''");

    userEvent.type(inputEl, "t");

    const firstSpanAgain = screen.getByTestId("div0");

    expect(firstSpanAgain).toHaveStyle("color: #10f318");
  });

  test("Test that as the user types, the RED color shows in the Div if he/she is wrong", () => {
    const inputEl = screen.queryByTestId("main-input");
    const firstSpan = screen.getByTestId("div0");

    expect(firstSpan).toHaveStyle("color: ''");

    userEvent.type(inputEl, "s");

    const firstSpanAgain = screen.getByTestId("div0");

    expect(firstSpanAgain).toHaveStyle("color: rgb(226, 5, 5)");
  });
});
