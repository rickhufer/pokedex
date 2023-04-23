import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Form.module.css"
import validate from "./validate"
import { allTypes } from "../../redux/actions";
import axios from "axios";

const Form = (props) => {
  const myTypes = useSelector((state) => state.myTypes)
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function inicio() {
      await dispatch(allTypes());
    }
    inicio();
  }, []);

  const defaultData = {
    name: "", hp: 1, attack: 1, defense: 1, speed: 0, height: 0, weight: 0, image: "", types: []
  }
  const defaultError = { name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", image: "", types: "" }

  const [form, setForm] = useState(defaultData);
  const [errors, setErrors] = useState(defaultError);

  const getTypeIndex = (type) => myTypes.indexOf(type) + 1;

  const handleinputChange = (event) => {
    const prop = event.target.name;
    const val = event.target.value;

    setForm({ ...form, [prop]: val, });
    setErrors(validate({ ...form, [prop]: val, }, errors));
  }
  const handleinputChangeCheck = (event) => {
    const val = event.target.value;
    const isChecked = event.target.checked;
    const prop = event.target.name;
    console.log("VAL:", val, ", CHECK:", isChecked, ", PROP:", prop);
    // const myKey = myTypes.includes(val) ? "types" : "";

    var retorno = {};
    setForm((prevState) => {
      if (isChecked) {
        retorno = {
          ...prevState,
          types: [...prevState.types, getTypeIndex(val)]
        }
        return retorno;
      } else {
        retorno = {
          ...prevState,
          types: prevState.types.filter((item) => item !== getTypeIndex(val))
        }
        return retorno;
      }
    });
    setErrors(validate(retorno, errors));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // props.login(form);
    console.log("FORM: ", form);
    console.log("ERRORS: ", errors);
    if (Object.values(errors).every(elemento => elemento === "")) {

      axios.post(`/pokemons`, form)
        .then(resp => {
          setForm(defaultData)
          alert("El pokemon fue creado");
        })
        .catch(err => {
          setForm(defaultData)
          alert("Error, vuelve a intentarlo")
        })

      setErrors(defaultError)
      setForm(defaultData)
    }
    else alert("Datos incorrectos")
  }

  // async function inicio() {
  //   await dispatch(allTypes());
  // }
  // inicio();

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h1>Crea tu propio pokemon</h1><hr /><br />
        <div className={styles.group}>
          <label className={styles.label} htmlFor="name" >Nombre: </label>
          <div>
            <input
              type="text"
              name='name'
              className={errors.name ? styles.errors : styles.success}
              value={form.name}
              onChange={handleinputChange} />
            <br /><span className={styles.inputMessage}>{errors.name}</span>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="hp" >Vida: </label>
          <div>
            <input
              type="number"
              name='hp'
              className={errors.hp ? styles.errors : styles.success}
              value={form.hp}
              onChange={handleinputChange} />
            <br /><span className={styles.inputMessage}>{errors.hp}</span>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="attack" >Ataque: </label>
          <div>
            <input
              type="number"
              name='attack'
              className={errors.attack ? styles.errors : styles.success}
              value={form.attack}
              onChange={handleinputChange} />
            <br /><span className={styles.inputMessage}>{errors.attack}</span>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="defense" >Defensa: </label>
          <div>
            <input
              type="number"
              name='defense'
              className={errors.defense ? styles.errors : styles.success}
              value={form.defense}
              onChange={handleinputChange} />
            <br /><span className={styles.inputMessage}>{errors.defense}</span>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="speed" >Velocidad: </label>
          <div>
            <input
              type="number"
              name='speed'
              className={errors.speed ? styles.errors : styles.success}
              value={form.speed}
              onChange={handleinputChange} />
            <br /><span className={styles.inputMessage}>{errors.speed}</span>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="height" >Altura: </label>
          <div>
            <input
              type="number"
              name='height'
              className={errors.height ? styles.errors : styles.success}
              value={form.height}
              onChange={handleinputChange} />
            <br /><span className={styles.inputMessage}>{errors.height}</span>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="weight" >Peso: </label>
          <div>
            <input
              type="number"
              name='weight'
              className={errors.weight ? styles.errors : styles.success}
              value={form.weight}
              onChange={handleinputChange} />
            <br /><span className={styles.inputMessage}>{errors.weight}</span>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="types" >Tipos: </label>
          <div>
            {myTypes.map((type, index) => (
              <label key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={form.types.includes(getTypeIndex(type))}
                  onChange={handleinputChangeCheck}
                />
                {type}
              </label>
            ))}
            <br /><span className={styles.inputMessage}>{errors.types}</span>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="image" >Pega la URL de la imagen (PNG en tamaño 475px x 475px): </label>
          <div>
            <input
              type="text"
              name='image'
              className={errors.image ? styles.errors : styles.success}
              value={form.image}
              onChange={handleinputChange} />
            <br /><span className={styles.inputMessage}>{errors.image}</span><br />
          </div>
        </div>
        <button type='submit' className={styles.button}>Crear</button><br />
        <div><p>Preview</p>{(form.image || errors.image === "") && <img src={form.image} />}</div>

      </form>
    </div>
  );
}

export default Form;