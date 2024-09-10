import React from "react";
import { useState } from "react";

const CheckBox = ({ content, reLine, changeUp }) => {
  const [fixNum, setFixNum] = useState(content.id);
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
        id: fixNum,
        text: fixText,
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
      <li>{content.text}</li>
      <input
        type="checkbox"
        value={content.isDone}
        onChange={() => {
          content.isDone = !content.isDone;
          console.log(content.isDone);
        }}
      />
    </div>
  );
};

export default CheckBox;
