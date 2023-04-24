import styles from "./Landing.module.css"
import { Link } from "react-router-dom";


const Landing = () => {
  return (
    <div className={styles.container}>
      <h1>POKÉMON</h1>
      <Link to="/home"><button>Ingresar</button></Link>
    </div>
  )
}

export default Landing;