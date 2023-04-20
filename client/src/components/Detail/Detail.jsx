import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import axios from "axios"

const Detail = () => {
  const { detailId } = useParams();
  const [poke, setPoke] = useState({});

  useEffect(() => {
    const carga = async () => {
      try {
        const data = await axios.get(`/pokemons/${detailId}`)
        setPoke(data.data[0]);
      } catch (error) {
        window.alert(error);
      }
    }
    carga();
    return setPoke({});
  }, [detailId]);

  return (
    <div className={styles.detailContainer}>
      {poke.name ? (
        <>
          <p className={styles.id}>id: {poke.id}</p>
          <h2 className={styles.h2}>{poke.name}</h2>
          <p><b>Vida:</b> {poke.hp}</p>
          <p><b>Ataque:</b> {poke.attack}</p>
          <p><b>Defensa:</b> {poke.defense}</p>
          <p><b>Velocidad:</b> {poke.speed}</p>
          <p><b>Altura:</b> {poke.height}</p>
          <p><b>Peso:</b> {poke.weight}</p>
          <p><b>Personalizado:</b> {poke.custom}</p>
          <p><b>Tipos: </b>{poke.types.map((elem) => elem).join(", ")}</p>
          <div className={styles.cardMedia}>
            <img className={styles.img} src={poke.image} alt={poke.name} />
          </div>
        </>
      ) : ("...cargando")
      }
    </div>
  )
}

export default Detail;