const axios = require("axios");
const format = require("../utils/format");
const { Pokemon, Type } = require("../db")

const getPokemonByName = async (name) => {

  const dataDb = await Pokemon.findOne({
    where: { name: name },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      }
    },
  })
  console.log(dataDb);

  if (dataDb === null) {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return format(data.data);
  }

  return dataDb.dataValues;
}

module.exports = getPokemonByName;