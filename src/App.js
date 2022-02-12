import React, { useState } from "react";

import Type from "./Components/Type/Type";

const App = () => {
  const [wordsToDisplay, setWordsToDisplay] = useState(
    `in the beginning talk to me when i am calling you cause you see in this life when two things are settled it cannot be rejected that is why when you are in school know that this life and another is the formula of the mother and her daughter for the better tommorrow since the end and the light which people are scared from doing and going to so cheer up and relax because all will be well this is shorter so i have to add more stuff to this write up or article or anything you decide to call it in the end one love pals`
  );

  return (
    <Type
      wordsToDisplay={wordsToDisplay}
      setWordsToDisplay={setWordsToDisplay}
    />
  );
};

export default App;
