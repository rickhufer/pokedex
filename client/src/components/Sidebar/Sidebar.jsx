import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { allPokemons, allTypes, allMyPokemons, orderPoke } from "../../redux/actions";


const Sidebar = () => {
  const [order, setOrder] = useState({
    asc: false,
    desc: false,
    alfa: true,
    attack: false,
  });
  const [filters, setFilters] = useState({
    original: false,
    custom: false,
    tipo: "",
  });

  const myTypes = useSelector(state => state.myTypes);
  const dispatch = useDispatch();

  useEffect(async () => {
    let querys = "?" + formatOrder(order) + "&" + formatFilter(filters);
    console.log(querys);
    await dispatch(allPokemons(querys));
    await dispatch(allTypes());
    dispatch(allMyPokemons());
  }, [order, filters]);

  const formatOrder = ({ asc, desc, alfa, attack, }) => {
    let a = !asc && !desc ? ("") : (asc && !desc ? "order=asc" : "order=desc");
    let b = !asc && !desc ? ("") : (alfa && !attack ? "&sort=name" : "&sort=attack");
    let c = `${a}${b}`;
    // console.log(c);
    return c;
  }
  const formatFilter = ({ original, custom, tipo }) => {
    var a = !original && !custom ? ("") : (original && !custom ? "custom=false" : "custom=true");
    var b = tipo === "" ? ("") : (`type=${tipo}`);
    var c = `${a}&${b}`;
    // console.log(c);
    return c;
  }

  const handleUp = (event) => {
    if (event.target.checked) {
      if (order.desc) { setOrder({ ...order, asc: true, desc: false }) }
      else setOrder({ ...order, asc: true });
    }
    else setOrder({ ...order, asc: false });
  }
  const handleDown = (event) => {
    if (event.target.checked) {
      if (order.asc) { setOrder({ ...order, asc: false, desc: true }) }
      else setOrder({ ...order, desc: true });
    }
    else setOrder({ ...order, desc: false });
  }
  const handleAlfa = (event) => {
    if (event.target.checked) {
      setOrder({ ...order, tipo: false, alfa: true })
    }
    else setOrder({ ...order, tipo: true, alfa: false })
  }

  const handleAttack = (event) => {
    if (event.target.checked) {
      setOrder({ ...order, tipo: true, alfa: false })
    }
    else setOrder({ ...order, tipo: false, alfa: true })
  }

  const handleTipo = (event) => {
    setFilters({
      ...filters,
      tipo: event.target.value,
    })
  }
  const handleOriginal = (event) => {
    var valor = event.target.checked;
    valor ? (setFilters({ ...filters, original: true, })) : (setFilters({ ...filters, original: false, }))
  }
  const handleCustom = (event) => {
    var valor = event.target.checked;
    valor ? (setFilters({ ...filters, custom: true, })) : (setFilters({ ...filters, custom: false, }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.orden}>
        <h4>ORDENACIÓN</h4>
        <div>
          {/* <p>Ordenar:</p> */}
          <form action="#">
            <label>
              <input type="checkbox" name="asc" checked={order.asc} onChange={handleUp} />Ascendente
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
              <input type="checkbox" checked={order.alfa} onChange={handleAlfa} />Por alfabeto
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" checked={order.attack} onChange={handleAttack} />Por ataque
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
              <input type="checkbox" checked={filters.original} onChange={handleOriginal} />Originales
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" checked={filters.custom} onChange={handleCustom} />Personalizados
              <span ></span>
            </label><br /><br />

          </form>
        </div>
        <div >
          <span>Filtrar por tipo:</span>
          <form action="#">

            <label>
              <select value={filters.tipo} onChange={handleTipo}>
                <option value="">Seleccione un tipo</option>
                {myTypes.map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
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