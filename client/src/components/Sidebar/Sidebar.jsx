import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css"
import { useEffect, useState } from "react";
import axios from "axios";


const Sidebar = () => {
  const [order, setOrder] = useState({ asc: false, desc: false });

  const [isOriginal, setIsOriginal] = useState(true);
  const [isCustom, setIsCustom] = useState(true);

  // const [filters, setFilters] = useState({
  //   type: "",
  //   custom: "",
  // });
  // const [ordering, setOrdering] = useState({
  //   order: "",
  //   sort: "",
  // });

  const myPokemons = useSelector(state => state.myPokemons);
  const dispatch = useDispatch();

  const handleOriginal = (event) => {
    if (event.target.checked) setIsOriginal(true);
    else setIsOriginal(false);
  }
  const handleCustom = (event) => {
    if (event.target.checked) setIsCustom(true);
    else setIsCustom(false);
  }

  // useEffect(() => {
  //   setOrder({ asc: false, desc: false });

  // }, [order]);

  const handleUp = (event) => {
    if (event.target.checked) {
      if (order.desc) { setOrder({ asc: true, desc: false }) }
      else setOrder({ ...order, asc: true });
    }
    else setOrder({ ...order, asc: false });
  }
  const handleDown = (event) => {
    if (event.target.checked) {
      if (order.asc) { setOrder({ asc: false, desc: true }) }
      else setOrder({ ...order, desc: true });
    }
    else setOrder({ ...order, desc: false });
  }


  return (
    <div className={styles.container}>
      <div className={styles.orden}>
        <h4>ORDENACIÓN</h4>
        <div>
          {/* <p>Ordenar:</p> */}
          <form action="#">
            <label>
              <input type="checkbox" checked={order.asc} onChange={handleUp} />Ascendente
            </label><br />

            <label>
              <input type="checkbox" checked={order.desc} onChange={handleDown} />Descendente
              <span></span>
            </label><br /><br />

          </form>
        </div>
        <div >
          <span>Tipo de ordenamiento:</span>
          <form action="#">

            <label>
              <input type="checkbox" />Por alfabeto
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" />Por tipo
              <span ></span>
            </label><br />

          </form>
        </div>
      </div>
      <div className={styles.filtrado}>
        <h4>FILTRADO</h4>
        <div >
          {/* <p>Filtrar por:</p> */}
          <form action="#">

            <label>
              <input type="checkbox" checked={isOriginal} onChange={handleOriginal} />Originales
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" checked={isCustom} onChange={handleCustom} />Personalizados
              <span ></span>
            </label><br /><br />

          </form>
        </div>
        <div >
          <span>Filtrar por tipo:</span>
          <form action="#">

            <label>
              <select  >
                <option>Seleccione un tipo</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <span ></span>
            </label><br />

          </form>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;