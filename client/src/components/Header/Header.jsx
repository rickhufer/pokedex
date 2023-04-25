import styles from "./Header.module.css"
import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.container}>
      {/* <h1>Henry Pokemon</h1> */}
      <div className={styles.containerHeader}>
        <div className={styles.logo}><Link to="/home"><img src="../../assets/images/logo.png" alt="" /></Link></div>
        <nav className={styles.nav}>

          <Link className={styles.myLink} to="/home">Home</Link>
          <Link className={styles.myLink} to="/home/create">Creador de pokemones</Link>

        </nav>
        <div className={styles.searchbar}>
          <SearchBar />
        </div>
      </div>
      {/* <div className={styles.espacio}></div> */}
    </div>
  )
}

export default Header;