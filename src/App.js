import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import { useState } from "react";
import axios from "axios";
import icon from "./icon.png";
import Card from "./Components/Card";

function App() {
  let [search, setSearch] = useState("");
  let [data,setData] = useState([])

  function sendSearch() {
    axios
      .get(`http://127.0.0.1:3001/send?data=${search}`)
      .then((res) => {        
        console.log(res.data)
        setData(res.data);
        // console.log(data);
      })
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

      <div className="card--collection">
        {data.map((element,index) => {
          return <Card id = {element.id} title ={element.title} image = {element.image} key = {index}/>
        })}
      </div>


    </div>
  );
}

export default App;
