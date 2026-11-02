# Pokedex

A simple Pokedex website built with **Node.js**, **Express** and **EJS**, using the public [PokeAPI](https://pokeapi.co).

Search for any Pokémon by name or number to see its sprite, types, height, weight, abilities and base stats.

## Features

- Search by name (`charizard`) or Pokédex number (`6`). Extra spaces and capital letters are ignored, so `" Tapu Koko "` finds `tapu-koko`.
- Each Pokémon has its own URL (`/pokemon/charizard`), so you can bookmark and share it.
- **Previous** and **Next** buttons to browse the Pokédex in order.
- Type badges with one color per type.
- Base stats shown as bars, with the value inside each bar.
- Separate error messages for a Pokémon that does not exist (404) and for when the PokeAPI cannot be reached (500).
- Responsive layout that works on phones.

## Tech stack

| Tool | Used for |
| --- | --- |
| [Express 5](https://expressjs.com) | Server and routes |
| [EJS](https://ejs.co) | HTML templates and partials |
| [Axios](https://axios-http.com) | Requests to the PokeAPI |
| CSS | Styling, with no framework |

## Getting started

You need [Node.js](https://nodejs.org) 18 or later.

```bash
git clone https://github.com/GuiPopin/PokeAPI.git
cd PokeAPI
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## Routes

| Route | What it does |
| --- | --- |
| `GET /` | Home page with the search form |
| `GET /search?pokemon=<name>` | Cleans up the search text and redirects to the Pokémon's page. An empty search goes back to the home page. |
| `GET /pokemon/:name` | Fetches the Pokémon from the PokeAPI and renders its card. `:name` can be a name or a number. |

## Project structure

```
PokeAPI/
├── index.js              # Express server and routes
├── public/
│   └── styles/
│       └── main.css      # Site styles
└── views/
    ├── index.ejs         # Main page: search result, error or welcome message
    └── partials/
        ├── header.ejs    # <head>, title and search form
        └── footer.ejs    # Credits and closing tags
```

## Credits

- Pokémon data and sprites come from [PokeAPI](https://pokeapi.co).
- Built as an exercise for a Udemy web development course.
