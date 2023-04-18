import styles from "./SearchBar.module.css"
import { useState } from 'react'

const SearchBar = ({ onSearch, logout }) => {

  const [inputId, setInputId] = useState("");

  const handleInput = (event) => {
    setInputId(event.target.value);
  }
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      onSearch(inputId)
    }
  }

  return (
    <div className={styles.contSearch}>
      <div className={styles.search}>
        <input onKeyDown={handleEnter} onChange={handleInput} className={styles.input} type="text" />
        <button onClick={() => onSearch(inputId)} className={styles.button} type='submit'>
          Buscar
        </button>
      </div>
    </div>
  )
}

export default SearchBar;