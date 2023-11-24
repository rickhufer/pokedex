const axios = require('axios');
const { Pokemon, Type } = require('../db');

var cacheAll = [];
var cacheApi = [];
var cacheDb = [];
var myFav = [25, 175, 54, 52, 39, 143];

// Obtiene todos los pokemones de la Api y DB
// Tambien recibe los tipos de ordenación y filtros
const getPokemons = async (page, order, sort, type, custom) => {
  if (custom === 'true') custom = true;
  if (custom === 'false') custom = false;

  var cacheMax = 60;

  // Crea el caché y temp
  if (cacheApi.length !== cacheMax) {
    cacheApi = await getApi(cacheMax, myFav);
  }
  cacheDb = await getDb();
  cacheAll = [...cacheDb, ...cacheApi];

  // Ordenación
  if (order && sort) {
    cacheAll = orderAll([...cacheAll], order, sort);
  }

  // Filtrados
  if (type) {
    cacheAll = cacheAll.filter((elem) => elem.types.includes(type));
  }
  if (custom === true || custom === false) {
    cacheAll = cacheAll.filter((elem) => elem.custom === custom);
  }

  return cacheAll;
};

// Obtiene los pokemones por nombre
const getPokemonByName = async (name) => {
  name = name.toLowerCase();
  let dataDb = await Pokemon.findAll({
    where: { name: name },
    include: {
      model: Type,
      // attributes: ["name"],
      // through: {
      //   attributes: [],
      // }
    },
  });

  if (dataDb.length > 0) {
    dataDb = transformCacheDb(dataDb);
    return dataDb;
  }
  if (dataDb.length === 0) {
    try {
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let myPoke = format(data.data);
      myPoke.custom = false;
      return [myPoke];
    } catch (error) {
      throw Error(
        'Este pokemon no existe en los originales ni en los personalizados',
      );
    }
  }
};

// Obtiene los pokemones por su ID
const getPokemonById = async (id) => {
  if (isNaN(id)) {
    try {
      let dataDb = await Pokemon.findAll({
        where: { id: id },
        include: {
          model: Type,
          // attributes: ["name"],
          // through: {
          //   attributes: [],
          // }
        },
      });

      if (dataDb.length === 0)
        return { message: 'Este pokemon no existe en los personalizados' };
      dataDb = transformCacheDb(dataDb);
      return dataDb;
    } catch (error) {
      throw Error('Este pokemon no existe en los personalizados');
    }
  } else {
    try {
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let myPoke = format(data.data);
      myPoke.custom = false;
      return [myPoke];
    } catch (error) {
      throw Error('Este pokemon no existe en los originales');
    }
  }
};

// =========== FUNCIONES DE APOYO ===========
// FUNCION DE APOYO: Obtiene solo los pokemones de la API
const getApi = async (cacheMax, myFav) => {
  var cont = 1;
  var contPoke = 1;
  var data;
  var myPoke = [];
  var cache = [];
  while (cont <= cacheMax) {
    if (cont <= myFav.length) {
      data = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${myFav[cont - 1]}`,
      );
    } else {
      var prueba = myFav.findIndex((elem) => contPoke === elem);
      while (prueba !== -1) {
        contPoke++;
        prueba = myFav.findIndex((elem) => contPoke === elem);
      }
      data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${contPoke}`);
      contPoke++;
    }

    myPoke = format(data.data);
    myPoke.custom = false;
    cache.push(myPoke);
    cont++;
  }

  return cache;
};

// FUNCION DE APOYO: Obtiene solo los pokemones de la Base de Datos
const getDb = async () => {
  let cacheDb = await Pokemon.findAll({
    include: {
      model: Type,
      // attributes: ["name"],
      // through: {
      //   attributes: [],
      // }
    },
  });
  // }
  cacheDb = transformCacheDb(cacheDb);

  return cacheDb;
};

// FUNCION DE APOYO: Ordena todo los elementos
const orderAll = (array, order, sort) => {
  if (sort === 'name') {
    if (order === 'desc') {
      array.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
    }
    if (order === 'asc') {
      array.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
  }

  if (sort === 'attack') {
    if (order === 'asc') {
      array.sort((x, y) => x.attack - y.attack);
    }
    if (order === 'desc') {
      array.sort((x, y) => y.attack - x.attack);
    }
  }

  return array;
};

// FUNCION DE APOYO: Formatea los datos obtenido de la API
const format = (data) => {
  let { id, name, image, sprites, stats, height, weight, types } = data;

  name = name;
  id = id;
  image = sprites.other['official-artwork'].front_default;
  // image = sprites.other.dream_world.front_default;
  hp = stats[0].base_stat;
  attack = stats[1].base_stat;
  defense = stats[2].base_stat;
  speed = stats[5].base_stat;
  height = height;
  weight = weight;

  types = types.map((elem) => elem.type.name);

  return { id, name, image, hp, attack, defense, speed, height, weight, types };
};

// FUNCION DE APOYO: Formatea los datos que estan en la DB
const transformCacheDb = (array) => {
  return array.map((obj) => ({
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
    types: obj.dataValues.types.map((typeObj) => typeObj.dataValues.name),
  }));
};

module.exports = {
  getPokemons,
  getPokemonByName,
  getPokemonById,
};
