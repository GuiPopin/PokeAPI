import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const pokeURL = "https://pokeapi.co/api/v2";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

function abilitiesNotHidden(abilityList){
  let shownAbilities = [];
  for (let i = 0; i<abilityList.length; i++) {
    if (!abilityList[i].is_hidden) {
      shownAbilities.push(abilityList[i])
    }
  }
  return shownAbilities;
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  const pokemonSearched = req.body.pokemon;
  try {
    const result = await axios.get(pokeURL + `/pokemon/${pokemonSearched}`);
    res.render("index.ejs", {
      pokemonName: capitalizeFirstLetter(result.data.name),
      pokemonHeight: result.data.height/10,
      pokemonWeight: result.data.weight/10,
      pokemonTypes: result.data.types,
      pokemonSprite: result.data.sprites.other.home.front_default,
      pokemonAbilities: abilitiesNotHidden(result.data.abilities)
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {error: `The pokemon ${pokemonSearched} does not exist!`});
  };
  // console.log(abilitiesNotHidden(result.data.abilities)[0].ability.name);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});