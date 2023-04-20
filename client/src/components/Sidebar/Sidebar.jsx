import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css"
import { useEffect, useState } from "react";
import { allPokemons, allTypes } from "../../redux/actions";

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

  useEffect(() => {
    async function inicio() {
      let querys = "?" + formatOrder(order) + "&" + formatFilter(filters);
      await dispatch(allTypes());
      await dispatch(allPokemons(querys));
      // dispatch(allMyPokemons());
    }
    inicio();
  }, [dispatch, order, filters]);

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
      setOrder({ ...order, attack: false, alfa: true })
    }
    else setOrder({ ...order, attack: true, alfa: false })
  }

  const handleAttack = (event) => {
    if (event.target.checked) {
      setOrder({ ...order, attack: true, alfa: false })
    }
    else setOrder({ ...order, attack: false, alfa: true })
  }

  const handleTipo = (event) => {
    setFilters({
      ...filters,
      tipo: event.target.value,
    })
  }
  const handleOriginal = (event) => {
    if (event.target.checked) {
      if (filters.custom) { setFilters({ ...filters, custom: false, original: true }) }
      else setFilters({ ...filters, original: true });
    }
    else setFilters({ ...filters, original: false });
  }
  const handleCustom = (event) => {
    if (event.target.checked) {
      if (filters.original) { setFilters({ ...filters, custom: true, original: false }) }
      else setFilters({ ...filters, custom: true });
    }
    else setFilters({ ...filters, custom: false });
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