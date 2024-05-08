const axios = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const recipe = req.body.data;
  console.log(recipe);  
  await getRecipe(recipe);
  res.sendStatus(200);
});

async function getRecipe(recipe) {
  try {
    console.log("Inside async function");
    const apiKey = "be9239b2ed564167a5d1074f798c67cf";
    let resp = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe}&number=10`
    );
    console.log(21, resp.data);
  } catch (e) {
    console.log(e);
  }
}

app.listen(3001, () => {
  console.log("Sever is Running on Port 3001...");
});
