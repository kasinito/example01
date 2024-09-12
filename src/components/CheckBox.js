import React from "react";
import { useState } from "react";

const CheckBox = ({ content, reLine, changeUp, checker }) => {
  const [fixText, setFixText] = useState("");

  //   const changeText = (content) => {
  //     setChangeUp(true);
  //   };

  const changeabler = (e) => {
    setFixText(e.target.value);
  };

  const reload = (e) => {
    e.preventDefault();
    if (fixText !== "") {
      const lLet = {
        id: content.id,
        text: fixText,
        isDone: false,
      };
      reLine(lLet);
      setFixText("");
    }
  };

  return content.isDone && changeUp ? (
    <form key={content.id} onSubmit={(e) => reload(e)}>
      <input onChange={changeabler} value={fixText} />
      <button>confirm</button>
    </form>
  ) : (
    <div key={content.id}>
      <li style={{ textDecoration: content.finish && "line-through" }}>
        {content.text}
      </li>
      <input
        type="checkbox"
        checked={content.isDone}
        //   value={content.isDone}
        onChange={() => {
          checker(content);
        }}
      />
    </div>
  );
};

export default CheckBox;
