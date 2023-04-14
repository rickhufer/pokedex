const axios = require("axios");
const format = require("../utils/format")
const { Pokemon, Type } = require("../db")

const getPokemons = async (page) => {
  const limit = 12; var offset = 0;

  if (!(page === undefined || page === 1)) {
    offset = limit * (page - 1);
  }

  let allPokemons = [], myPoke;

  let myPokeDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      }
    },
  });
  cont = 25;
  // cont = offset;
  // let cantPokeDb = myPokeDb.length;

  // while (cont < limit + offset - myPokeDb.length) {
  //   const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${cont}`);

  //   myPoke = format(data.data);
  //   myPoke.custom = false;
  //   allPokemons.push(myPoke);
  //   cont++;
  // }
  while (cont < 50) {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${cont}`);

    myPoke = format(data.data);
    myPoke.custom = false;
    allPokemons.push(myPoke);
    cont++;
  }

  return [...myPokeDb, ...allPokemons];
}

module.exports = getPokemons;