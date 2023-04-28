
const format = (data) => {
  let { id, name, image, sprites, stats, height, weight, types } = data;

  name = name;
  id = id;
  image = sprites.other["official-artwork"].front_default;
  // image = sprites.other.dream_world.front_default;
  hp = stats[0].base_stat;
  attack = stats[1].base_stat;
  defense = stats[2].base_stat;
  speed = stats[5].base_stat;
  height = height;
  weight = weight;

  types = types.map((elem) => elem.type.name)

  return { id, name, image, hp, attack, defense, speed, height, weight, types }
}

const transformCacheDb = (array) => {
  return array.map(obj => ({
    id: obj.id,
    name: obj.name,
    hp: obj.hp,
    attack: obj.attack,
    defense: obj.defense,
    speed: obj.speed,
    height: obj.height,
    weight: obj.weight,
    image: obj.image,
    custom: obj.custom,
    types: obj.dataValues.types.map(typeObj => typeObj.dataValues.name)
  }));
}

module.exports = {
  format,
  transformCacheDb,
};
