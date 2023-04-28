const { Pokemon } = require("../db")

const postPokemon = async ({ name, image, hp, attack, defense, speed, height, weight, types }) => {
  var name = name.toLowerCase();

  try {
    var [myPoke, created] = await Pokemon.findOrCreate({
      where: { name: name },
      defaults: {
        image, hp, attack, defense, speed, height, weight,
      }
    });

    if (!created) {
      return [myPoke, created]
    } else {
      await myPoke.addTypes(types);
      return [myPoke, created]
    }
  } catch (error) {
    throw new Error('Error al encontrar o crear un Pokemon');
  }

}

module.exports = postPokemon;