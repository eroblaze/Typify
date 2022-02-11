import React from "react";

const Div = ({ words, pastColor }) => {
  const wordsArr = words.split("");
  const output = wordsArr.map((letter, index) => {
    return (
      <span
        key={index}
        data-testid={`div${index}`}
        style={{
          color:
            pastColor[index] === "rgb(226, 5, 5)" ? "black" : pastColor[index],
          backgroundColor:
            pastColor[index] === "rgb(226, 5, 5)" ? pastColor[index] : null,
        }}
      >
        {letter}
      </span>
    );
  });

  return (
    <div data-testid="words-div" className="words">
      {output}
    </div>
  );
};

export default Div;
