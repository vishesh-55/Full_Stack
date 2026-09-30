import { useState } from "react";

function Todo() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const add = () => {
    if (text) setList([...list, text]);
    setText("");
  };

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={add}>Add</button>

      {list.map((item, i) => (
        <p key={i}>
          {item}
          <button onClick={() =>
            setList(list.filter((_, x) => x !== i))
          }>Delete</button>
        </p>
      ))}
    </>
  );
}
export default Todo;