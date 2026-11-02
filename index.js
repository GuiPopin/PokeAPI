import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const pokeURL = "https://pokeapi.co/api/v2";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

function normalizeText(text) {
  return text.trim().toLowerCase().replaceAll(" ", "-");
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

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/search", (req, res) => {
  const pokemonSearched = normalizeText(req.query.pokemon || "");
  if (!pokemonSearched) {
    res.redirect("/");
  } else {
    res.redirect(`/pokemon/${pokemonSearched}`);
  };
});

app.get("/pokemon/:name", async (req, res) => {
  const pokemonSearched = normalizeText(req.params.name);
  try {
    const result = await axios.get(pokeURL + `/pokemon/${pokemonSearched}`);
    res.render("index.ejs", {
      pokemonName: capitalizeFirstLetter(result.data.name),
      pokemonHeight: result.data.height/10,
      pokemonWeight: result.data.weight/10,
      pokemonTypes: result.data.types,
      pokemonSprite: result.data.sprites.other.home.front_default,
      pokemonAbilities: abilitiesNotHidden(result.data.abilities),
      pokemonNumber: result.data.id,
      pokemonStats: result.data.stats
    });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).render("index.ejs", {error: `The pokemon ${pokemonSearched} does not exist!`});
    } else {
      console.log(error.message)
      res.status(500).render("index.ejs", {error: `It was not possible to access PokeAPI, try again later.`});
    };
  };
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});