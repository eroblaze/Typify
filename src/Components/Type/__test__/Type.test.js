import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import Type from "../Type";
import Div from "../../Div/WordsDiv";
import Input from "../../Input/InputField";

const words = "what is the meaning of this?";

describe("Type main Component", () => {
  // There is no need to test if this component is rendered because this is the main
  // component which encompasses the other two and since I've already checked for the
  // existence of the other two, there is no need to check for this.

  beforeEach(() => {
    render(<Type />);
  });

  test("Test when component initially renders, all the text are black", () => {
    const firstSpan = screen.getByTestId("div0");
    const secondSpan = screen.getByTestId("div1");
    expect(firstSpan).toHaveStyle("color: ''");
    expect(secondSpan).toHaveStyle("color: ''");
  });

  test("Test that as the user types, the green color shows in the Div if he/she is correct", () => {
    const inputEl = screen.queryByTestId("main-input");
    // screen.debug();
    // const divEl = screen.getByTestId("words-div");

    // fireEvent.change(inputEl, { target: { value: "i" } }); // used
  });
});
