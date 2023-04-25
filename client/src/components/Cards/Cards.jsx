import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Cards.module.css"
import Card from "../Card/Card"

const Cards = ({ myPokemons }) => {
  const [params] = useSearchParams();

  let param = params.get("page");

  const perPage = 12;

  const [myPage, setMyPage] = useState({
    start: 1,
    end: 13,
  });

  const [myPoke, setMyPoke] = useState([]);

  const totalPages = Math.ceil(myPokemons.length / perPage);

  const itemsPage = [];
  for (let i = 1; i <= totalPages; i++) {
    itemsPage.push(<Link onClick={() => updatePage()} key={i} to={`/home/?page=${i}`} ><div className={param == i ? styles.actual : styles.pages}>{i}</div></Link>);
  }
  const breakPage = (event) => {
    console.log(event.target.name);
  }

  const updatePage = () => {
    // setMyPoke([])
    // setMyPoke(myPokemons.slice(Number(param), Number(param) + perPage));
  }

  useEffect(() => {
    setMyPoke([])
    var numInicio = param === null || param < 0 ? (0) : ((Number(param) - 1) * perPage);
    setMyPoke(myPokemons.slice(numInicio, numInicio + perPage));
  }, [myPokemons, param])

  return (
    <div>
      <div className={styles.contPages}>
        <Link to={param <= 1 ? `/home/?page=${param}` : `/home/?page=${param - 1}`} ><div className={styles.pages}>&lt;&lt;</div></Link>

        {itemsPage}

        <Link to={param >= totalPages ? `/home/?page=${param}` : `/home/?page=${Number(param) + 1}`} ><div className={styles.pages}>&gt;&gt;</div></Link>
      </div>
      <div className={styles.completo}>
        <div className={styles.container}>
          {
            myPoke.map(({ id, name, image, custom, types }) => (
              // myPokemons.slice(0, visible).map(({ id, name, image, custom, types }) => (

              <Card key={id} id={id} name={name} image={image} custom={custom} types={types} />
            ))
          }
        </div>



        {/* {
            visible < myPokemons.length &&
            <div className="btn-auction center">
              <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
            </div>
          } */}
      </div>

    </div>
  )
}

export default Cards;