import {
  ALL_POKEMONS,
  POKEMON_BY_NAME,
  ALL_TYPES,
  ORDER_POKEMONS,
} from './actions';

const initialState = {
  myPokemons: [],
  myTypes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POKEMONS:
      return {
        ...state,
        myPokemons: [...action.payload],
      };

    case POKEMON_BY_NAME:
      return {
        ...state,
        myPokemons: [...action.payload],
      };

    case ORDER_POKEMONS:
      return {
        ...state,
        myPokemons: [...action.payload],
      };

    case ALL_TYPES:
      return {
        ...state,
        myTypes: [...action.payload],
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
