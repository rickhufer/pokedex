const axios = require("axios");
const { format, transformCacheDb } = require("../utils/format")
const { Pokemon, Type } = require("../db")

var cacheAll = [];
var cacheApi = [];
var cacheDb = [];
var myFav = [25, 175, 54, 52, 39, 143];

const getPokemons = async (page, order, sort, type, custom) => {
  if (custom === "true") custom = true;
  if (custom === "false") custom = false;

  var cacheMax = 60; let limit = 24; var offset;

  // Crea el caché y temp
  if (cacheApi.length !== cacheMax) {
    cacheApi = await getApi(cacheMax, myFav)
  };
  cacheDb = await getDb();
  cacheAll = [...cacheDb, ...cacheApi];

  // Ordenación
  if (order && sort) {
    cacheAll = orderAll([...cacheAll], order, sort);
    console.log("Entré en order y sort");
  }

  // Filtrados
  if (type) {
    cacheAll = cacheAll.filter(elem => elem.types.includes(type));
  }
  if (custom === true || custom === false) {
    cacheAll = cacheAll.filter(elem => elem.custom === custom);
  };

  //paginado
  // if (page === undefined) page = 1;
  // offset = (page - 1) * limit;
  // return temp.slice(offset, offset + limit);
  return cacheAll;
}

const getApi = async (cacheMax, myFav) => {
  var cont = 1; var contPoke = 1;
  var data;
  var myPoke = []; var cache = [];
  while (cont <= cacheMax) {

    if (cont <= myFav.length) {
      data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${myFav[cont - 1]}`);
    } else {
      var prueba = myFav.findIndex(elem => contPoke === elem);
      while (prueba !== -1) {
        contPoke++;
        prueba = myFav.findIndex(elem => contPoke === elem);
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
}

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
}

const orderAll = (array, order, sort) => {

  if (sort === "name") {
    if (order === "desc") {
      array.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
    }
    if (order === "asc") {
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
      throw Error("Este pokemon no existe en los originales ni en los personalizados")
    }
  }

}



const getPokemonById = async (id) => {
  console.log(isNaN(id));
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
      dataDb = transformCacheDb(dataDb);
      console.log(dataDb);
      return dataDb;
    } catch (error) {
      throw Error("Este pokemon no existe en los personalizados")
    }

  } else {
    try {
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let myPoke = format(data.data);
      myPoke.custom = false;
      return [myPoke];
    } catch (error) {
      throw Error("Este pokemon no existe en los originales")
    }
  }
}


module.exports = {
  getPokemons,
  getPokemonByName,
  getPokemonById,
};