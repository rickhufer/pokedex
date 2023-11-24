import axios from 'axios';

export const ALL_POKEMONS = 'ALL_POKEMONS';
export const POKEMON_BY_NAME = 'POKEMON_BY_NAME';
export const ALL_TYPES = 'ALL_TYPES';
export const ORDER_POKEMONS = 'ORDER_POKEMONS';

export const allPokemons = (allQuery) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons/${allQuery}`);
      dispatch({ type: ALL_POKEMONS, payload: response.data });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const allTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/types`);
      const data = response.data.map((elem) => elem.name);
      dispatch({ type: ALL_TYPES, payload: data });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const orderPoke = (queryComplet) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons/${queryComplet}`);
      dispatch({ type: ORDER_POKEMONS, payload: response.data });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const getPokemonsByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons/${name}`);
      dispatch({ type: POKEMON_BY_NAME, payload: response.data });
    } catch (error) {
      window.alert(error);
    }
  };
};
