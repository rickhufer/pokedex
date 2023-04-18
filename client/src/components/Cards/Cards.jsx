import { useState } from "react";
import { Link } from "react-router-dom";
// import CardModal from '../CardModal';
import styles from "./Cards.module.css"

const Cards = ({ data }) => {
  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  }

  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <>
        <div className={styles.completo}>
          {/* explore */}
          <div className={styles.container}>
            {/* box-epxlore */}
            {
              data.slice(0, visible).map((item, index) => (
                <div className={styles.scCardProduct} key={index}>
                  {/* className={`sc-card-product explode style2 mg-bt comingsoon `} */}
                  {/* <div className={`sc-card-product explode style2 mg-bt ${item.feature ? 'comingsoon' : ''} `} key={index}> */}

                  <div className={styles.cardMedia}>
                    <Link to="/item-details-01"><img src={item.img} alt="Axies" /></Link>
                    <div className={styles.comingSoon}>{item.feature}</div>
                  </div>

                  <div className={styles.cardTitle}>
                    <h3><Link className={styles.link} to="/item-details-01">{item.title}</Link></h3>
                  </div>

                  <div className="meta-info">
                    <span className={styles.types}>{item.tags}</span>
                    <span className={styles.types}>{item.tags}</span>
                  </div>
                </div>
              ))
            }
          </div>
          {
            visible < data.length &&
            <div className="btn-auction center">
              <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
            </div>
          }
        </div>
        {/* <CardModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> */}
      </>
    </div>
  )
}

export default Cards;