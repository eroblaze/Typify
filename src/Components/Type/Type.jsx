// Bug Update : Ctrl Z and Ctrl Y
// Also, I just noticed that when you press space bar when you haven't completed a word, the characters that are turned to red, are also included in the calculation for total characters. Is that suppose to be so?

import React, { useState, useEffect } from "react";
import Div from "../Div/WordsDiv";
import Input from "../Input/InputField";
import generateWpm from "../../Helpers/Generate_wpm";

// useful variables / bindings
let everyIndexBeforeSpace = [];
const dataToCheck = [];
let backKeyPressed = 0;
let splittedArr = [];
const pastColor = [];
let spaceSplit = [];
let counter = 0;
let space = 0;
let globalCount = 0;
let extraCount = 0;
// For the timer
let timeHasStarted = false;
let time = 61;
let timeClear;
// For the main function's context
let char;
let value;

let valueLen;
let valueLenInd;

const Type = () => {
  const [wordsToDisplay, setWordsToDisplay] = useState(
    `in the beginning talk to me when i am calling you cause you see in this life when two things are settled it cannot be rejected that is why when you are in school know that this life and another is the formula of the mother and her daughter for the better tommorrow since the end and the light which people are scared from doing and going to so cheer up and relax because all will be well this is shorter so i have to add more stuff to this write up or article or anything you decide to call it in the end one love pals`
  );
  // start initialization
  useEffect(() => {
    spaceSplit = wordsToDisplay.split(" ");
  }, []);

  useEffect(() => {
    splittedArr = wordsToDisplay.split("");
  }, [wordsToDisplay]);
  // end initialization

  // states
  const [userIn, setUserIn] = useState("");

  const [colorId, setColor] = useState("");

  const [fake, setFake] = useState(false);
  // end states

  function updateTime() {
    if (time === 0) {
      clearInterval(timeClear);
      console.log("Time is up!", time);

      // To generate the wpm
      generateWpm(1, pastColor);
      time = 61;

      return;
    }
    time--;
    console.log(time);
  }

  function wrapperSetWords(startInd, excess) {
    setWordsToDisplay((prev) => {
      const cpFirst = prev.slice(0, startInd);
      const cpLast = prev.slice(startInd);
      const newState = cpFirst + excess[excess.length - 1] + cpLast;
      return newState;
    });
  }

  function addMoreLetters() {
    if (!counter) {
      // To check if the space bar has been pressed at least once
      if (valueLenInd > everyIndexBeforeSpace[0]) {
        extraCount++;
        const startInd = everyIndexBeforeSpace[0] + 1;
        const excess = value.slice(startInd);

        wrapperSetWords(startInd, excess);
      }
    } else {
      const diff =
        everyIndexBeforeSpace[counter] - everyIndexBeforeSpace[counter - 1];
      if (valueLenInd > diff - 2) {
        extraCount++;

        const startInd = everyIndexBeforeSpace[counter] + 1;
        const excess = value.slice(diff - 1);

        wrapperSetWords(startInd, excess);
      }
    }
  }

  function ifKeyIsNotBackspace() {
    // Make sure any key pressed after a word without a space isn't included
    // To get the indexes of all letters before a space

    everyIndexBeforeSpace.splice(0);
    for (let i = 0; i < splittedArr.length; i++) {
      if (splittedArr[i + 1] === " ") {
        everyIndexBeforeSpace.push(i);
      }
    }
    // Add the additional letters that are more than the length of the required word
    valueLen = value.length;
    valueLenInd = valueLen - 1;

    // To restrict the user from typing more than 25 letters for each word
    if (valueLenInd < 25) {
      globalCount++; // To keep tracks of letters;

      addMoreLetters();

      // End Test
      setUserIn(value);

      dataToCheck.push(char);
      const id = dataToCheck.length - 1;
      const otherId = splittedArr[id];

      if (dataToCheck[id] === otherId) pastColor.push("#10f318");
      else pastColor.push("rgb(226, 5, 5)");

      setColor((prev) => {
        let newId;
        if (prev.id === undefined) newId = -1;
        else newId = prev.id;
        const reset = {
          id: newId + 1,
        };
        return reset;
      });
    }
  }

  function ifNormalKeysPressed() {
    // This needs to be here for some reason
    if (char === null) {
      backKeyPressed++;
      // To get how many letters to remove and the number of colors to pop off
      const num = userIn.length - value.length;
      // To make sure the colorId is in sync with the num
      setColor((prevId) => {
        return {
          id: prevId.id - num,
        };
      });
      dataToCheck.splice(dataToCheck.length - num);
      pastColor.splice(pastColor.length - num);
      globalCount -= num;
      const newCount = extraCount;

      // If Ctrl + backspace was pressed :
      if (num > 1) {
        setWordsToDisplay((prev) => {
          const prevArr = prev.split(" ");
          let prevCount = 0;
          for (let i = 0; i <= space; i++) {
            prevCount += prevArr[i].length;
            prevCount++;
          }
          prevCount--;
          // Check if num and prevCount are not equal because if there was
          // fullstop (.) they will be different
          if (extraCount === 0 || num === prevArr[space].length) {
            extraCount = 0;

            const cpFirst = prev.slice(0, prevCount - newCount);

            const cpLast = prev.slice(prevCount);
            const newState = cpFirst + cpLast;

            return newState;
          } else {
            // work with the difference from behind
            if (prevArr[space].length - num > spaceSplit[space].length) {
              extraCount =
                prevArr[space].length - num - spaceSplit[space].length;
            } else extraCount = 0;

            let count = prevCount - num;
            const cpFirst = prev.slice(0, count);

            const cpLast = prev.slice(prevCount);
            const newState = cpFirst + cpLast;

            return newState;
          }
        });
      }
      // If only backspace was pressed :
      else {
        if (colorId.id > spaceSplit[space].length - 1) {
          extraCount--;
          const startInd = globalCount;

          setWordsToDisplay((prev) => {
            const cpFirst = prev.slice(0, startInd);
            const cpLast = prev.slice(startInd + 1);
            const newState = cpFirst + cpLast;
            return newState;
          });
        }
      }
      setUserIn(value);
      return;
    }

    ifKeyIsNotBackspace();
  }

  function showRedColor() {
    let gotten = false;
    const id = dataToCheck.length - 1;
    let newId = null;

    for (let i = id + 1; i < splittedArr.length; i++) {
      if (!gotten) {
        globalCount++;
        dataToCheck.push(i);
        if (splittedArr[i] === " ") {
          pastColor.push("blue"); // If it is a space

          gotten = true;
          newId = i;
        } else {
          pastColor.push("rgb(226, 5, 5)");
        }
      }
    }
    dataToCheck[newId] = " ";
  }

  function ifSpaceBarPressed() {
    // For the counter;
    counter++;
    space++;
    extraCount = 0;

    setColor((prevId) => {
      return {
        id: -1,
      };
    });

    /* If the word wasn't completed before pressing space bar, 
    complete the word with red color for the remaining letters.
    */
    showRedColor();

    setUserIn("");
    // Make React re-render this component :
    setFake((prev) => !prev);
  }

  // Main function handler
  const handleUserInput = (e) => {
    char = e.nativeEvent.data;
    value = e.target.value;

    if (!timeHasStarted) {
      timeClear = setInterval(updateTime, 1000);
    }
    timeHasStarted = true;

    if (space < spaceSplit.length) {
      if (char !== " ") {
        ifNormalKeysPressed();
      } else {
        ifSpaceBarPressed();
      }
    }
  };
  // end main function

  return (
    <>
      <Div words={wordsToDisplay} pastColor={pastColor} />
      <Input userIn={userIn} onInput={handleUserInput} />
    </>
  );
};

export default Type;
