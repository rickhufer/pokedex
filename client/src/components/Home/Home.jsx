import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Home.module.css"


const Home = () => {
  const myPokemons = useSelector((state) => state.myPokemons);

  return (
    <div className={styles.cont}>
      <div className={styles.cont2}>
        <div className={styles.container}>
          <div className={styles.sideBar}>
            <Sidebar />
          </div>
          <div className={styles.myCards}>
            <Cards myPokemons={myPokemons} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;