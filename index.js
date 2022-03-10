// lib and imports
const express = require("express");
const app = express();

const recipe = require("./controllers/recipe")

// app setup
app.use(express.json())

app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  // callback
  res.render('recipes.ejs');
});


// Create here your api setup




app.listen(3000, () => console.log("Server Up and running"));
