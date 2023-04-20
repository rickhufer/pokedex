import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBar.module.css"
import { useState } from 'react'
import axios from "axios";
import { allPokemons } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch()
  const myPokemons = useSelector((state) => state.myPokemons)

  const [inputName, setInputName] = useState("");
  const [poke, setPoke] = useState([]);

  const handleInput = (event) => {
    setInputName(event.target.value);
  }
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      onSearch(inputName)
    }
  }

  const onSearch = async (name) => {
    console.log(name);
    // const temp = myPokemons.find((elem) => elem.name === name);
    // console.log(temp);

    dispatch(allPokemons(`?name=${name}`))





    //   return alert("Este personaje ya existe");
    // else {
    //   axios.get(`/pokemons/${name}`)
    //     .then((data) => {
    //       if (data.data.name) {
    //         setCharacters((oldChar) => [...oldChar, data.data]);
    //       } else {
    //         alert('No hay personajes con ese ID');
    //       }
    //     })
    // }
  }

  return (
    <div className={styles.contSearch}>
      <div className={styles.search}>
        <input onKeyDown={handleEnter} onChange={handleInput} className={styles.input} type="text" />
        <button onClick={() => onSearch(inputName)} className={styles.button} type='submit'>
          Buscar
        </button>
      </div>
    </div>
  )
}

export default SearchBar;