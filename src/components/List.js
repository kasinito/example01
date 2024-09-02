import React, { useState } from "react";

const List = () => {
  const [list, uselist] = useState("");

  return (
    <>
      <input bg-ground-text="hello"></input>
      <textarea>{list}</textarea>
    </>
  );
};

export default List;
