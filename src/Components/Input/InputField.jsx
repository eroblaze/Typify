import React from "react";

const Input = ({ userIn, onInput }) => {
  const preventPaste = (e) => {
    e.preventDefault();
  };
  const preventDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="input">
      <input
        type="text"
        onChange={onInput}
        value={userIn}
        autoFocus={true}
        onPaste={preventPaste}
        onDrop={preventDrop}
        autoComplete="off"
        data-testid="main-input"
      />
    </div>
  );
};

export default Input;
