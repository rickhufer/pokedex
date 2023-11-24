const postPokemon = require('../controllers/postPokemon');
const {
  getPokemons,
  getPokemonById,
  getPokemonByName,
} = require('../controllers/getPokemons');

const getPokeHandler = async (req, res) => {
  const { page, name, order, sort, type, custom } = req.query;

  try {
    const myPoke = name
      ? await getPokemonByName(name)
      : await getPokemons(page, order, sort, type, custom);
    res.status(200).json(myPoke);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getPokeByIdHandler = async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const myPoke = await getPokemonById(idPokemon);
    if (myPoke.message) res.status(404).json(myPoke);
    res.status(200).json(myPoke);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Creación de pokemones
const postPokeHandler = async (req, res) => {
  const customPoke = req.body;
  try {
    const [myPoke, created] = await postPokemon(customPoke);
    created
      ? res
          .status(201)
          .json({
            message: `Pokemon ${myPoke.dataValues.name} fue creado exitosamente.`,
          })
      : res
          .status(409)
          .json({
            message: `El Pokemon ${myPoke.dataValues.name} ya existe en la base de datos.`,
          });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getPokeHandler,
  getPokeByIdHandler,
  postPokeHandler,
  getPokeHandler,
};
