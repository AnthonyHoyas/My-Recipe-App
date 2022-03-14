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

app.post('/api/addRecipe', (req, res) => {
  recipe.addRecipe(req.body)
})

app.post('/api/recipe', recipe.recipedb)

app.post('/api/delrecipe', (req, res) => {
  recipe.recipedel(req.body)
})


app.listen(3000, () => console.log("Server Up and running"));
