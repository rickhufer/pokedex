const axios = require("axios");
const format = require("../utils/format")
const { Pokemon, Type } = require("../db")

const getPokemonById = async (id) => {

  if (isNaN(id)) {
    const dataDb = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
    });
    return dataDb;
  } else {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return format(data.data);
  }

}

module.exports = getPokemonById;