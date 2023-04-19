// const getPokemonByName = require("../controllers/getPokemonByName");
// const getPokemons = require("../controllers/getPokemons")
// const getPokemonById = require("../controllers/getPokemonById")
const postPokemon = require("../controllers/postPokemon")

const { getPokemons, getPokemonById, getPokemonByName } = require("../controllers/getPokes")

const getPokeHandler = async (req, res) => {

  const { page, name, order, sort, type, custom } = req.query;

  try {
    const myPoke = name ? await getPokemonByName(name) : await getPokemons(page, order, sort, type, custom);
    res.status(200).json(myPoke);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const getPokeByIdHandler = async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const myPoke = await getPokemonById(idPokemon);
    res.status(200).json(myPoke);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const postPokeHandler = async (req, res) => {
  const customPoke = req.body;
  console.log(customPoke);
  try {
    const newPoke = await postPokemon(customPoke);
    res.status(200).json(newPoke)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getPokeHandler,
  getPokeByIdHandler,
  postPokeHandler,
  getPokeHandler
}