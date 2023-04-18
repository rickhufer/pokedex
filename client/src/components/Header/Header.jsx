import styles from "./Header.module.css"
import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.container}>
      {/* <h1>Henry Pokemon</h1> */}
      <div className={styles.containerHeader}>
        <Link to="/home"><img src="./assets/images/logo.png" alt="" /></Link>
        <nav className={styles.nav}>
          <Link to="/home">El home</Link>
          <SearchBar />
        </nav>
      </div>
      {/* <div className={styles.espacio}></div> */}
    </div>
  )
}

export default Header;