// Server.js

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const dbName = 'recipe';

async function connect() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        return db;
    } catch (err) {
        console.log(err);
    }
}

app.post('/save', async (req, res) => {
    const { id, title, image } = req.body;
    try {
        const db = await connect();
        const usersCollection = db.collection('saved');
        const user = await usersCollection.insertOne({ id, title, image });
        console.log("inserted");
        res.json({ message: "saved" });
    } catch (err) {
        console.log(err);
    }
});

app.post('/display', async (req, res) => {
  try {
      const db = await connect();
      const usersCollection = db.collection('saved');
      const user = await usersCollection.find().toArray();
      console.log("fetched");
      console.log(user);
      res.json({user});
  } catch (err) {
      console.log(err);
  }
});

app.get("/send", async (req, res) => {
    const recipe = req.query.data;
    console.log("Requested Recipe: ", recipe);
    try {
        const data = await getRecipe(recipe);
        console.log("Received Data:", data);
        res.send(data);
    } catch (error) {
        console.log("Error in fetching", error);
        res.status(500).send("Error fetching recipe");
    }
});

async function getRecipe(recipe) {
    try {
        console.log("Inside async function");
        const apiKey = "be9239b2ed564167a5d1074f798c67cf";
        let resp = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe}&number=10`
        );
        // console.log(21, resp.data);
        return resp.data.results;
    } catch (error) {
        console.log("Error fetching recipe: ", error);
        throw error;
    }
}

app.listen(3001, () => {
    console.log("Server is Running on Port 3001...");
});
