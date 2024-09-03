import React, { useState } from "react";

const List = () => {
  const [text, setText] = useState("");
  const [line, setLine] = useState([]);
  const [idnum, setnum] = useState(1);
  const [changeUp, setChangeUp] = useState(false);
  const [fixNum, setFixNum] = useState("");
  const [fixText, setFixText] = useState("");

  const upload = (e) => {
    e.preventDefault();
    if (text !== "") {
      const llet = {
        id: idnum,
        text: text,
      };

      setLine([...line, llet]);
      setText("");
      setnum(idnum + 1);
    }
  };
  const changeable = (e) => {
    if (changeUp) {
      setFixText(e.target.value);
    } else {
      setText(e.target.value);
    }
  };
  const deleteText = (idx) => {
    setLine(line.filter((arr) => arr.id !== idx));
  };
  const reload = (e, idx) => {
    console.log(idx);
    e.preventDefault();

    if (fixText !== "") {
      const lLet = {
        id: idx,
        text: fixText,
      };
      setLine(line.map((arr) => (arr.id === idx ? lLet : arr)));
      setFixText("");
    }
    setChangeUp(false);
  };
  const changeText = (idx) => {
    setChangeUp(true);
    setFixNum(idx);
  };

  return (
    <>
      <form onSubmit={upload}>
        <input
          onChange={changeable}
          value={text}
          onKeyDown={changeable}
        ></input>
        <button>upload</button>
      </form>

      <ul>
        {line.map((content) => {
          if (changeUp && fixNum === content.id) {
            return (
              <form key={content.id} onSubmit={(e) => reload(e, content.id)}>
                <input onChange={changeable} value={fixText}></input>
                <button>confirm</button>
              </form>
            );
          } else {
            return (
              <div key={content.id}>
                <li>{content.text}</li>
                <button onClick={() => deleteText(content.id)}>delete</button>
                <button onClick={() => changeText(content.id)}>rewrite</button>
              </div>
            );
          }
        })}
      </ul>
    </>
  );
};
export default List;
