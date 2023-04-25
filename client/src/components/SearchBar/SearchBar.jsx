import styles from "./SearchBar.module.css"
import { useState } from 'react'
import { createSearchParams, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");

  const handleInput = (event) => {
    setInputName(event.target.value);
  }
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      onSearch()
    }
  }
  const onSearch = () => {
    // setInputName("");
    const params = [['name', inputName]];
    navigate({
      pathname: '/home/search',
      search: `?${createSearchParams(params)}`,
    })
  }


  return (
    <div className={styles.contSearch}>
      <div className={styles.search}>
        <input onKeyDown={handleEnter} defaultValue={inputName} onChange={handleInput} className={styles.input} type="text" />
        <button onClick={() => onSearch()} className={styles.button} type='submit'>
          Buscar
        </button>
      </div>
    </div>
  )
}

export default SearchBar;