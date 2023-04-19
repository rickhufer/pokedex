import styles from "./Card.module.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { addFavorite, removeFavorite } from "../../redux/actions";
import React from "react";

const Card = ({ id, name, image, custom, types }) => {

  // const [isFav, setIsFav] = useState(false);

  // const handleFavorite = () => {
  //   if (isFav) {
  //     setIsFav(false);
  //     removeFavorite(id);
  //   } else {
  //     setIsFav(true);
  //     addFavorite({
  //       id,
  //       name,
  //       species,
  //       gender,
  //       image,
  //       status,
  //       origin,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   allCharacters.forEach((fav) => {
  //     if (fav.id === id) {
  //       setIsFav(true);
  //     }
  //   });
  // }, [allCharacters]);

  return (
    <div className={styles.scCardProduct}>
      <div className={styles.cardMedia}>
        <Link to="/details-01"><img src={image} alt="Axies" /></Link>
        <div className={styles.comingSoon}>{custom ? "Personalizado" : "Original"}</div>
      </div>

      <div className={styles.cardTitle}>
        <h3><Link className={styles.link} to="/details-01">{name}</Link></h3>
      </div>

      <div className="meta-info">
        {types.map((item, index) => (<span key={index} className={styles.types}>{item}</span>))}
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    allCharacters: state.allCharacters,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (character) => { dispatch(addFavorite(character)) },
    removeFavorite: (id) => { dispatch(removeFavorite(id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);