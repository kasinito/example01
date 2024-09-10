import React, { useEffect, useState } from "react";
import ConfigBox from "./ConfigBox";
import CheckBox from "./CheckBox";
import axios from "axios";

const List = () => {
  const [text, setText] = useState("");
  const [line, setLine] = useState([]);
  const [changeUp, setChangeUp] = useState(false);

  // const [checked, setChecked] = useState(false);
  // const [del_Num, setDel_Num] = useState([]);
  // const [conNum, setConNum] = useState("");

  const haveTolist = async () => {
    await axios.get("http://localhost:3001/list").then((res) => {
      setLine(res.data);
    });
  };
  const upload = async (e) => {
    e.preventDefault();
    if (text !== "") {
      const llet = {
        text: text,
        isDone: false,
      };
      // setLine([...line, llet]);
      await axios.post("http://localhost:3001/list", llet);
      setText("");
      console.log(llet);
    }
  };
  const changeable = (e) => {
    setText(e.target.value);
  }; //입력 칸 변화시 onChange

  const deleteText = () => {
    // setLine(line.filter((arr) => arr.id !== idx));
    // setLine(line.filter((arr) => arr.isDone !== true));

    axios.delete(
      "http://localhost:3001/list",
      line.filter((arr) => arr.isDone !== true)
    );
  }; //삭제

  const reLine = (lLet) => {
    const fixContent = line.map((arr) => (arr.id === lLet.id ? lLet : arr));
    // setLine(fixContent);
    setChangeUp(false);
  }; //수정

  useEffect(() => {
    haveTolist();
  }, [line]);

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
            // <ConfigBox
            //   key={content.id}
            //   content={content}
            //   deleteText={deleteText}
            //   reLine={reLine}
            // />
            <CheckBox
              key={content.id}
              content={content}
              reLine={reLine}
              changeUp={changeUp}
            />
          );
        })}
      </ul>

      <button onClick={deleteText}>delete</button>
      <button
        onClick={() => {
          setChangeUp(true);
        }}
      >
        config
      </button>
    </>
  );
};
export default List;
