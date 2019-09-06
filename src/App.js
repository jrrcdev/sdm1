import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3011/api/todo")
      .then(res => res.json())
      .then(json => setTodos(json));
  }, [setTodos]);

  const handleSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:3011/api/todo", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        setTodos([...todos, json]);
        setText("");
      });
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} height={80} />
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={handleChange}></input>
          <button type="submit">Criar</button>
        </form>
        <div style={{ marginTop: 25 }}>
          <table bordercolor="#ff0000">
            <thead>
              <tr>
                <td>
                  <b>Todo</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {todos.map(t => (
                <tr key={t._id}>
                  <td>{t.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
