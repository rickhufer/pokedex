import axios from "axios";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const GET_FAVORITES = "GET_FAVORITES";

export const ALL_POKEMONS = "ALL_POKEMONS";
export const POKEMON_BY_NAME = "POKEMON_BY_NAME";
export const ALL_TYPES = "ALL_TYPES";
export const ORDER_POKEMONS = "ORDER_POKEMONS";
// export const ALL_MY_POKEMONS = "ALL_MY_POKEMONS";

// export const ADD_CHARACTER = "ADD_CHARACTER";
// export const REMOVE_CHARACTER = "REMOVE_CHARACTER";

export const addFavorite = (character) => {
  axios.post(`/rickandmorty/fav/`, character)
  return { type: ADD_FAVORITE, payload: character }
}
export const removeFavorite = (id) => {                            // async await
  axios.delete(`/rickandmorty/fav/${id}`)
  return { type: REMOVE_FAVORITE, payload: id }
}

export const filterCards = (gender) => {
  return { type: FILTER, payload: gender }
}
export const orderCards = (id) => {
  return { type: ORDER, payload: id }
}

export const getFavorites = () => {
  return async function (dispatch) {

    try {
      const response = await axios.get(`/rickandmorty/fav`);
      dispatch({ type: GET_FAVORITES, payload: response.data });
    } catch (error) {

    }

  };
};





export const allPokemons = (allQuery) => {
  return async function (dispatch) {

    try {
      const response = await axios.get(`/pokemons/${allQuery}`);
      dispatch({ type: ALL_POKEMONS, payload: response.data });
    } catch (error) {
      window.alert(error)
    }

  };
};
// export const allMyPokemons = () => {
//   return function (dispatch) {

//     dispatch({ type: ALL_MY_POKEMONS, });

//   };
// };

export const allTypes = () => {
  return async function (dispatch) {

    try {
      const response = await axios.get(`/types`);
      const data = response.data.map(elem => elem.name)
      dispatch({ type: ALL_TYPES, payload: data });
    } catch (error) {
    }
  };
};
export const orderPoke = (queryComplet) => {
  return async function (dispatch) {

    try {
      const response = await axios.get(`/pokemons/${queryComplet}`);
      dispatch({ type: ORDER_POKEMONS, payload: response.data });
    } catch (error) {
    }
  };
};
export const getPokemonsByName = (name) => {
  return async function (dispatch) {

    try {
      const response = await axios.get(`/pokemons/${name}`);
      dispatch({ type: POKEMON_BY_NAME, payload: response.data });
    } catch (error) {

    }

  };
};