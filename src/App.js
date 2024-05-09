import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import { useState } from "react";
import axios from "axios";
import Card from "./Components/Card";
import ReactLoading from "react-loading"
import Recipe from "./Recipe";




function App() {
  let [search, setSearch] = useState("");  //State Management for search query
  let [data, setData] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(false); // State variable for loading

  const [recipe, setRecipe] = useState();

  function sendSearch() {
    setUserdata([]);
    setLoading(true); // Set loading to true while fetching data
    axios
      .get(`http://127.0.0.1:3001/send?data=${search}`)
      .then((res) => {        
        console.log(res.data)
        setData(res.data);
        setLoading(false); // Set loading to false after data fetching completes
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
  }
  
  async function displayfunc(){
    setData([]);
    setLoading(true); // Set loading to true while fetching data
    try {
      const response = await fetch("http://localhost:3001/display", {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data.user);
      setUserdata(data.user);
      setLoading(false); // Set loading to false after data fetching completes
    } catch(err) {
      console.log(err);
      setLoading(false); // Set loading to false in case of error
    }
  }

  function changeRecipe(recipe)
  {
    setRecipe(recipe)
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
  <button onClick={sendSearch} className="display-button">
        <span className="material-icons">search</span> 
      </button>
        
      </div>
      <center><br/><br/>
      <button onClick={displayfunc} className="display-button">
        Display saved items
      </button>

</center>

      {/* Conditional rendering based on loading state */}
      {loading ? (
          <center><ReactLoading type="bubbles" color="#0000FF" height={200} width={200} /> </center>
      ) : (
        <div>
          <div className="card--collection">
            {data.map((element, index) => (
              <Card id={element.id} title={element.title} image={element.image} key={index} flag={true} />
            ))}
          </div>
          {/* Conditional rendering based on data length */}
          {userdata.length > 0 && (
            <div className="card--collection">
              {userdata.map((user) => (
                <div key={user.id}>
                  <Card id={user.id} title={user.title} image={user.image} flag={false} change= {changeRecipe} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {recipe && <Recipe recipe={recipe} /> }
    </div>
  );
}

export default App;
