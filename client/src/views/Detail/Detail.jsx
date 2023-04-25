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
    <div>
      <h2 className={styles.h2}>{poke.name}</h2>
      <div className={styles.detailContainer}>
        {poke.name ? (
          <>
            <div className={styles.contCard}>
              <div className={styles.cardMedia}>
                <img className={styles.img} src={poke.image} alt={poke.name} />
              </div>
            </div>
            <div className={styles.datos}>


              <div className={styles.caja}>
                <p><b>Vida:</b> {poke.hp}</p>
                <p><b>Ataque:</b> {poke.attack}</p>
                <p><b>Defensa:</b> {poke.defense}</p>
                {poke.speed && <p><b>Velocidad:</b> {poke.speed}</p>}
              </div>
              <div className={styles.caja}>
                {poke.height && <p><b>Altura:</b> {poke.height}</p>}
                {poke.weight && <p><b>Peso:</b> {poke.weight}</p>}
                <p><b>Tipos: </b>{poke.types.map((elem) => elem).join(", ")}</p>
              </div>
              <p><b>Personalizado:</b> {poke.custom === true ? "Si" : "No"}</p>
              <p className={styles.id}>id: {poke.id}</p>
            </div>
          </>
        ) : ("...cargando")
        }
      </div>
    </div>
  )
}

export default Detail;