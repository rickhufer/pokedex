import styles from "./Landing.module.css"
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.container}>
      {/* <h1>POKÉMON</h1> */}
      <Link className={styles.logo} to="/home"><img className={styles.logoimg} src="../../assets/images/logo.png" alt="" /></Link>
      <Link to="/home"><button className={styles.button}>Ingresar</button></Link>
    </div>
  )
}

export default Landing;