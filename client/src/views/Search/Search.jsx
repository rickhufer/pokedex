import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Cards from '../../components/Cards/Cards';
import styles from './Search.module.css';

const Search = () => {
  const [params] = useSearchParams();
  const [poke, setPoke] = useState([]);

  const carga = async (params) => {
    let param = params.get('name');
    if (param) {
      try {
        const data = await axios.get(`/pokemons/?name=${param}`);
        setPoke(data.data);
      } catch (error) {
        setPoke([]);
        window.alert('No se encontró el Pokemon');
      }
    } else {
      setPoke([]);
      window.alert('No se encontró el Pokemon');
    }
  };

  useEffect(() => {
    carga(params);
  }, [params]);

  return (
    <div className={styles.cont}>
      <div className={styles.cont2}>
        <div className={styles.container}>
          <div className={styles.sideBar}>{/* <Sidebar /> */}</div>
          <div className={styles.myCards}>
            <Cards myPokemons={poke} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
