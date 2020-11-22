import React, { useState } from "react";
import history from "../history";
import api from "../api";

const StartGame = () => {
  const [name, setName] = useState("");

  const handleClick = async () => {
    await api.startgame({ value: name }).then((play) => {
      window.localStorage.setItem("play", JSON.stringify(play));
      setName("");
      history.push("/cities-quiz");
      window.location.reload();
    });
  };

  return (
    <div className="startgame">
      <div className="start-container">
        <header className="App-header">
          <h1 className="startHeader rainbow"> Cities Quiz</h1>
        </header>
        <div className="text-container">
          <h2 className="insert-name fadeDown">Insert your name</h2>
          <input
            className="input-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="play-btn btn" onClick={() => handleClick()}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
