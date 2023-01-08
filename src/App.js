import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NBATable from "./components/Table";
import { Spinner } from "react-bootstrap";

function App() {
  const [teams, setTeams] = useState(null);
  const [text, setText] = useState("");

  const fetchData = async () => {
    axios.get("https://www.balldontlie.io/api/v1/teams").then((res) => {
      console.log(res.data.data);
      let a = res.data.data;

      setTeams(a);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setText(e);
  };

  if (teams === null)
    return (
      <diV className="text-center">
        <Spinner animation="border" />
      </diV>
    );

  return (
    <div className="App container">
      <h1 className="title" style={{ color: "#074684" }}>
        NBA TEAMS
      </h1>
      <input
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search..."
        className="input"
      />
      {teams!==null && <NBATable teams={teams} text={text} />}
    </div>
  );
}

export default App;
