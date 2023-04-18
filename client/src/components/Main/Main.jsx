import Cards from "../Cards/Cards";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Main.module.css"


const Main = ({ data }) => {
  return (
    <div className={styles.cont}>
      <div className={styles.cont2}>
        <div className={styles.container}>
          <div className={styles.sideBar}>
            <Sidebar />
          </div>
          <div className={styles.myCards}>
            <Cards data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;