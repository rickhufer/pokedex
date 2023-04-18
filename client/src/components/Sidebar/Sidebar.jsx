import styles from "./Sidebar.module.css"


const Sidebar = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.orden}>
        <h4>ORDENACIÓN</h4>
        <div>
          {/* <p>Ordenar:</p> */}
          <form action="#">
            <label>
              <input type="checkbox" defaultChecked="true" />Ascendente
            </label><br />

            <label>
              <input type="checkbox" defaultChecked="true" />Descendente
              <span></span>
            </label><br />

          </form>
        </div>
        <div >
          <p>Tipo de ordenamiento:</p>
          <form action="#">

            <label>
              <input type="checkbox" defaultChecked="true" />Por alfabeto
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" defaultChecked="true" />Por tipo
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
              <input type="checkbox" defaultChecked="true" />Originales
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" defaultChecked="true" />Personalizados
              <span ></span>
            </label><br />

          </form>
        </div>
        <div >
          <p>Filtrar por tipo:</p>
          <form action="#">

            <label>
              <input type="checkbox" defaultChecked="true" />Normal
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" defaultChecked="true" />Flying
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" defaultChecked="true" />Poison
              <span ></span>
            </label><br />

            <label>
              <input type="checkbox" defaultChecked="true" />Grass
              <span ></span>
            </label><br />

          </form>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;