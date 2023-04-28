import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./Cards.module.css"
import Card from "../Card/Card"

const Cards = ({ myPokemons }) => {
  const [params] = useSearchParams();
  let param = params.get("page");

  const perPage = 12;

  const [myPoke, setMyPoke] = useState([]);

  const totalPages = Math.ceil(myPokemons.length / perPage);

  const itemsPage = [];
  for (let i = 1; i <= totalPages; i++) {
    itemsPage.push(<Link className={styles.linkP} key={i} to={`/home/?page=${i}`} ><div className={param === i ? styles.actual : styles.pages}>{i}</div></Link>);
  }

  useEffect(() => {
    setMyPoke([])
    var numInicio = param === null || param < 0 ? (0) : ((Number(param) - 1) * perPage);
    setMyPoke(myPokemons.slice(numInicio, numInicio + perPage));
  }, [myPokemons, param])

  return (
    <div>
      <div className={styles.contPages}>
        <Link className={styles.linkP} to={param <= 1 ? (`/home/?page=${param}`) : `/home/?page=${param - 1}`} ><div className={styles.pages}>&lt;&lt;</div></Link>

        {itemsPage}

        <Link className={styles.linkP} to={param >= totalPages ? `/home/?page=${param}` : param === null ? (`/home/?page=2`) : `/home/?page=${Number(param) + 1}`} ><div className={styles.pages}>&gt;&gt;</div></Link>
      </div>
      <div className={styles.completo}>
        <div className={styles.container}>
          {
            myPoke.map(({ id, name, image, custom, types }) => (
              <Card key={id} id={id} name={name} image={image} custom={custom} types={types} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Cards;