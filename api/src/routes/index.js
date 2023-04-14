const { Router } = require('express');
const { getPokeHandler, getPokeByIdHandler, postPokeHandler } = require('../handlers/pokemonsHandlers');
const { getTypesHandler } = require('../handlers/typesHandlers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokeHandler)
router.get("/pokemons/:idPokemon", getPokeByIdHandler)
router.post("/pokemons", postPokeHandler)
router.get("/types", getTypesHandler)

module.exports = router;
