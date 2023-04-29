import React from "react";
import { Link } from "react-router-dom"

import styles from "./Card.module.css"

const Card = ({ id, name, image, custom, types, attack }) => {

  return (
    <div className={styles.scCardProduct}>
      <div className={styles.cardMedia}>
        <Link to={`/home/detail/${id}`}><img src={image} alt={name} /></Link>
        <div className={styles.custom}>{custom ? "Personalizado" : "Original"}</div>
      </div>

      <div className={styles.cardTitle}>
        <h3><Link className={styles.link} to={`/home/detail/${id}`}>{name}</Link></h3>
      </div>
      <div className={styles.cardTitle}>
        <h3><Link className={styles.link}>{attack}</Link></h3>
      </div>

      <div className="meta-info">
        {types.map((item, index) => (<span key={index} className={styles.types}>{item}</span>))}
      </div>
    </div>
  )
}

export default Card;