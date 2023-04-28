import { Link } from "react-router-dom";

import styles from "./Landing.module.css"

const Landing = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.logo} to="/home"><img className={styles.logoimg} src="../../assets/images/logo.png" alt="" /></Link>
      <Link to="/home"><button className={styles.button}>Ingresar</button></Link>
    </div>
  )
}

export default Landing;