import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FILTER,
  ORDER,
  // ADD_CHARACTER,
  // REMOVE_CHARACTER,
  GET_FAVORITES,

  ALL_POKEMONS,
  POKEMON_BY_NAME,
  // ALL_MY_POKEMONS,
  ALL_TYPES,
  ORDER_POKEMONS,
} from "./actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
  myPokemons: [],
  // myCache: [],
  myTypes: [],
};

const rootReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        myFavorites: [...state.myFavorites, action.payload],
        allCharacters: [...state.allCharacters, action.payload],
      };

    case REMOVE_FAVORITE:
      let allCharac = state.allCharacters;
      return {
        ...state,
        myFavorites: state.myFavorites.filter((elem) => elem.id !== action.payload),
        allCharacters: allCharac.filter((elem) => elem.id !== action.payload),
      };
    case GET_FAVORITES:
      return {
        ...state,
        myFavorites: [...action.payload],
        allCharacters: [...action.payload],
        // allCharacters: [...state.allCharacters, action.payload],
      };

    case FILTER:
      let allChar;
      if (action.payload !== "all") {
        allChar = state.allCharacters.filter((char) => char.gender === action.payload)
      } else allChar = state.allCharacters;
      return {
        ...state,
        myFavorites: [...allChar],
      };
    case ORDER:
      let myOrder = state.myFavorites;
      if (action.payload === "Ascendente") {
        myOrder.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      }
      if (action.payload === "Descendente") {
        myOrder.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }

      return {
        ...state,
        myFavorites: [...myOrder],
      };





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
    // case ALL_MY_POKEMONS:
    //   return {
    //     ...state,
    //     myPokemons: [...state.myCache],
    //   };

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
      return { ...state }
  }

};

export default rootReducer;
