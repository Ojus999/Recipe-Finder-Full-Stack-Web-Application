import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import { useState } from "react";
import axios from "axios";
import icon from "./icon.png";

function App() {
  let [search, setSearch] = useState("");

  function sendSearch() {
    axios
      .post("http://127.0.0.1:3001/send", { data: search })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <Header />
      <Body />
      <div className="search--div">
        <input
          type="text"
          placeholder="Enter a Recipe"
          id="search--input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={icon} alt="Search Icon" id="search-icon" onClick={sendSearch} />
      </div>
    </div>
  );
}

export default App;
