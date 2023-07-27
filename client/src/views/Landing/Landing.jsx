import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"

import styles from "./Landing.module.css"

const Landing = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.logo} to="/home"><img className={styles.logoimg} src={logo} alt="" /></Link>
      <Link to="/home"><button className={styles.button}>Ingresar</button></Link>
    </div>
  )
}

export default Landing;