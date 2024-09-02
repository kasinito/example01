import React, { useState } from "react";

const List = () => {
  const [text, setText] = useState("");
  const [line, setLine] = useState([]);

  const upload = () => {
    setLine([...line, text]);
    console.log(line);
    setText("");
  };
  const changeable = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <input onChange={changeable} value={text} enterKeyHint={upload}></input>
      <button onClick={upload}>upload</button>
      <ul>
        {line.map((content) => {
          return (
            <div>
              <li>{content}</li>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default List;
