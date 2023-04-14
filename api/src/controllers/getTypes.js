const { Type } = require("../db");
const axios = require("axios");

const getTypes = async () => {

  const allTypes = await Type.findAll();

  if (allTypes.length < 20) {
    const data = await axios.get(`https://pokeapi.co/api/v2/type`);
    const myTypes = data.data.results.filter((elem) => delete elem.url);

    await Type.bulkCreate(myTypes);
    return await Type.findAll();

  } else {
    return allTypes;
  }
}

module.exports = getTypes;