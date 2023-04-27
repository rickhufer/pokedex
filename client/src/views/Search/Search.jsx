import { useSearchParams } from "react-router-dom";
import Cards from "../../components/Cards/Cards";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Search.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [params] = useSearchParams();
  const [poke, setPoke] = useState([]);

  useEffect(() => {
    const carga = async (params) => {
      let param = params.get("name");
      try {
        const data = param ? await axios.get(`/pokemons/?name=${param}`) : { data: [] };
        setPoke(data.data);
      } catch (error) {
        setPoke([]);
      }
    }
    carga(params);
  }, [params])

  return (
    <div className={styles.cont}>
      <div className={styles.cont2}>
        <div className={styles.container}>
          <div className={styles.sideBar}>
            {/* <Sidebar /> */}
          </div>
          <div className={styles.myCards}>
            <Cards myPokemons={poke} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search;