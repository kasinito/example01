import React, { useEffect, useState } from "react";
import ConfigBox from "./ConfigBox";
import CheckBox from "./CheckBox";
import axios from "axios";

const List = () => {
  const [text, setText] = useState("");
  const [line, setLine] = useState([]);
  const [changeUp, setChangeUp] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [inConfig, setInConfig] = useState(false);

  // const [conNum, setConNum] = useState(1);

  const haveTolist = async () => {
    await axios.get("http://localhost:3001/list").then((res) => {
      setLine(res.data);
    });
  };

  const checkConfig = () => {
    const maller = line.filter((reser) => reser.isDone === true);
    console.log(maller);
    if (maller.length === 1 && !inConfig) {
      setChangeUp(true);
      setInConfig(true);
      setReloading(!reloading);
    } else {
      alert("can config only one");
    }
  };
  const upload = async (e) => {
    e.preventDefault();
    if (text !== "") {
      const llet = {
        text: text,
        isDone: false,
        finish: false,
      };
      // setLine([...line, llet]);
      await axios.post("http://localhost:3001/list", llet);
      setText("");
      console.log(llet);
      setReloading(!reloading);
    }
  };
  const firstLine = () => {
    line.map(async (str) => {
      await axios.patch(`http://localhost:3001/list/${str.id}`, {
        isDone: false,
      });
    });
    setReloading(!reloading);
  };
  const changeable = (e) => {
    setText(e.target.value);
  }; //입력 칸 변화시 onChange

  const deleteText = () => {
    // setLine(line.filter((arr) => arr.isDone !== true));
    // console.log(line.find((arr) => arr.isDone === true).id);
    // const deleteNum = line.find((arr) => arr.isDone === true).id;
    const deleteLine = line
      .filter((arr) => arr.isDone === true)
      .map((arrr) => {
        return arrr.id;
      });
    console.log(deleteLine);
    deleteLine.map((arr) => {
      axios.delete(`http://localhost:3001/list/${arr}`);
    });
    // axios.delete(`http://localhost:3001/list/${deleteNum}`);
    setReloading(!reloading);
  }; //삭제

  const reLine = (lLet) => {
    // const fixContent = line.map((arr) => (arr.id === lLet.id ? lLet : arr));
    axios.patch(`http://localhost:3001/list/${lLet.id}`, lLet);

    // setLine(fixContent);
    setChangeUp(false);
    setReloading(!reloading);
    setInConfig(false);
  }; //수정
  const doneLine = () => {
    const makingLine = line
      .filter((arr) => arr.isDone === true)
      .map((arrr) => {
        arrr.finish = !arrr.finish;
        arrr.isDone = false;
        return arrr;
      });

    console.log(makingLine);
    makingLine.map((liner) => {
      axios.patch(`http://localhost:3001/list/${liner.id}`, liner);
    });
    // axios.delete(`http://localhost:3001/list/${deleteNum}`);

    setReloading(!reloading);
  };
  const checker = async (e) => {
    if (!inConfig) {
      await axios.patch(`http://localhost:3001/list/${e.id}`, {
        isDone: !e.isDone,
      });
      setReloading(!reloading);
    }
  };
  useEffect(() => {
    haveTolist();
  }, [reloading]);
  useEffect(() => {
    firstLine();
  }, []);

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
              checker={checker}
            />
          );
        })}
      </ul>

      <button onClick={deleteText}>delete</button>
      <button onClick={checkConfig}>config</button>
      <button onClick={doneLine}>finish</button>
    </>
  );
};
export default List;
