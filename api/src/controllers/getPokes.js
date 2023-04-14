const axios = require("axios");
const format = require("../utils/format")
const { Pokemon, Type } = require("../db")

var cacheAll = [];
var cacheApi = [];
var cacheDb = [];


const getPokemons = async (page, order, sort, type, custom) => {
  let temp = [];
  var cacheAllOrder = [];
  var cacheMax = 24; let limit = 12; var offset;

  // Crea el caché
  cacheAll = await getAll(cacheDb, cacheApi, cacheMax);
  temp = [...cacheAll];

  // Ordenación
  if (order && sort) {
    cacheAllOrder = orderAll([...cacheAll], order, sort);
    temp = [...cacheAllOrder];
  }

  // Filtrados
  if (type && custom) {
    temp = cacheAll.filter(elem => elem.types.includes(type));
    temp = temp.filter(elem => elem.custom === custom);
  }
  if (type) {
    temp = cacheAll.filter(elem => elem.types.includes(type));
  }
  if (custom) {
    temp = cacheAll.filter(elem => elem.custom === custom);
  }

  //paginado
  if (page === undefined) page = 1;
  offset = (page - 1) * limit;
  return temp.slice(offset, offset + limit);
}

const dd = (cache) => {
  return cache.map(elem => { return { ...elem, types: Object.values(elem.types.map(elem => elem.name)) } })
}

const getAll = async (cacheDb, cacheApi, cacheMax) => {
  let totalDb = await Pokemon.count(); var t = [];
  if (totalDb != cacheDb.length) {
    cacheDb = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
    });
  }
  // cacheDb = dd([...cacheDb])
  // cacheDb = cacheDb.map(elem => { return { ...elem, types: [...Object.values(elem.types.map(elem => elem.name))] } })
  cacheDb = cacheDb.map(elem => {
    return {
      ...elem, types:
        [...Object.values(elem.types.map(elem => elem.name))]
    }
  })

  if (cacheApi.length === 0) {
    cont = 1;

    while (cont < cacheMax) {
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${cont}`);

      let myPoke = format(data.data);
      myPoke.custom = false;
      cacheApi.push(myPoke);
      cont++;
    }
  }
  return [...cacheDb, ...cacheApi];
}

const orderAll = (array, order, sort) => {

  if (sort === "name") {
    if (order === "asc") {
      array.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
    }
    if (order === "desc") {
      array.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
  }

  if (sort === "attack") {
    if (order === "asc") {
      array.sort((x, y) => x.attack - y.attack);
    }
    if (order === "desc") {
      array.sort((x, y) => y.attack - x.attack);
    }
  }

  return array;
}


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

  if (dataDb === null) {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return format(data.data);
  }

  return dataDb.dataValues;
}



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


module.exports = {
  getPokemons,
  getPokemonByName,
  getPokemonById,
};