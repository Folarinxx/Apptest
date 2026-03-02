import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/message")
      .then(res => setMessages(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/message", {
      text: text
    });

    setText(""); // clear input
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Message App 🚀</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      <h3>Messages:</h3>
      {messages.map((msg) => (
        <p key={msg._id}>{msg.text}</p>
      ))}
    </div>
  );
}

export default App;