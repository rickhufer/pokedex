import axios from "axios";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const GET_FAVORITES = "GET_FAVORITES";

export const ALL_POKEMONS = "ALL_POKEMONS";
export const ALL_TYPES = "ALL_TYPES";

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

export const allPokemons = () => {
  return async function (dispatch) {

    try {
      const response = await axios.get(`/`);
      dispatch({ type: ALL_POKEMONS, payload: response.data });
    } catch (error) {

    }

  };
};

export const allTypes = () => {
  return async function (dispatch) {

    try {
      const response = await axios.get(`/types`);
      dispatch({ type: ALL_TYPES, payload: response.data });
    } catch (error) {

    }

  };
};