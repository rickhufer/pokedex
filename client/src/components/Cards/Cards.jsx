import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
// import CardModal from '../CardModal';
import styles from "./Cards.module.css"
import Card from "../Card/Card"

const Cards = () => {

  const myPokemons = useSelector((state) => state.myPokemons);

  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  }

  return (
    <div>
      <>
        <div className={styles.completo}>
          {/* explore */}
          <div className={styles.container}>
            {/* box-epxlore */}
            {
              myPokemons.slice(0, visible).map(({ id, name, image, custom, types }) => (
                // myPokemons.slice(0, visible).map((item, index) => (

                <Card key={id} id={id} name={name} image={image} custom={custom} types={types} />
              ))
            }
          </div>
          {
            visible < myPokemons.length &&
            <div className="btn-auction center">
              <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
            </div>
          }
        </div>
      </>
    </div>
  )
}

export default Cards;