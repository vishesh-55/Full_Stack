import { useState } from "react";

function Search() {
  const names = ["Aman","Rahul","Vishesh","Rohit","Priya","Ankit","Neha","Karan"];
  const [text, setText] = useState("");

  const result = names.filter(n =>
    n.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <input
        placeholder="Search"
        onChange={e => setText(e.target.value)}
      />

      {result.length ? result.map(n => <p key={n}>{n}</p>)
        : <p>No results found</p>}
    </>
  );
}
export default Search;