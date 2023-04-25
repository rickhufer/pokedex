import { useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Home.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Home = () => {
  const myPokemons = useSelector((state) => state.myPokemons);

  const navigate = useNavigate();
  useEffect(() => {
    navigate({
      pathname: '/home',
      search: ``,
    })
  }, [myPokemons]);

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