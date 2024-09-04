import React, { useState } from "react";
import ConfigBox from "./ConfigBox";

const List = () => {
  const [text, setText] = useState("");
  const [line, setLine] = useState([]);
  const [idNum, setNum] = useState(1);

  const upload = (e) => {
    e.preventDefault();
    if (text !== "") {
      const llet = {
        id: idNum,
        text: text,
      };

      setLine([...line, llet]);
      setText("");
      setNum(idNum + 1);
    }
  };
  const changeable = (e) => {
    setText(e.target.value);
  };

  const deleteText = (idx) => {
    setLine(line.filter((arr) => arr.id !== idx));
    console.log(idx);
  };
  const reLine = (lLet) => {
    const fixContent = line.map((arr) => (arr.id === lLet.id ? lLet : arr));
    setLine(fixContent);
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
          return (
            <ConfigBox
              key={content.id}
              content={content}
              deleteText={deleteText}
              reLine={reLine}
            />
          );
        })}
      </ul>
    </>
  );
};
export default List;
