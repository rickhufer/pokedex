import Cards from "../Cards/Cards";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Main.module.css"


const Main = () => {
  return (
    <div className={styles.cont}>
      <div className={styles.cont2}>
        <div className={styles.container}>
          <div className={styles.sideBar}>
            <Sidebar />
          </div>
          <div className={styles.myCards}>
            <Cards />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;