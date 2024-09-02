import React, { useState } from "react";

const List = () => {
  const [text, setText] = useState("");
  const [line, setLine] = useState([]);

  const upload = () => {
    setLine([...line, text]);
    setText("");
  };
  const changeable = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <input onChange={changeable} value={text}></input>
      <button onClick={upload}>upload</button>
      <ul>
        {line.map((content, idx) => {
          return (
            <form key={idx}>
              <li>{content}</li>
            </form>
          );
        })}
      </ul>
    </>
  );
};

export default List;
