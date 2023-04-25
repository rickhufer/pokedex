import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Form.module.css"
import validate from "./validate"
import { allTypes } from "../../redux/actions";
import axios from "axios";

const Form = (props) => {
  const myTypes = useSelector((state) => state.myTypes)
  const dispatch = useDispatch();

  // const [imageUrl, setImageUrl] = useState('');


  const defaultData = {
    name: "", hp: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0, image: "", types: []
  }
  const defaultError = { name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", image: "", types: "" }

  const [form, setForm] = useState(defaultData);
  const [errors, setErrors] = useState(defaultError);

  useEffect(() => {
    async function inicio() {
      await dispatch(allTypes());
    }
    inicio();
    setForm(defaultData);
  }, []);

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

    var retorno = {};
    setForm((prevState) => {
      if (isChecked) {
        retorno = {
          ...prevState,
          types: [...prevState.types, getTypeIndex(val)]
        }
        setErrors(validate(retorno, errors));
        return retorno;
      } else {
        retorno = {
          ...prevState,
          types: prevState.types.filter((item) => item !== getTypeIndex(val))
        }
        setErrors(validate(retorno, errors));
        return retorno;
      }
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.values(errors).every(elem => elem === "")) {

      Object.keys(form).forEach(key => {
        if (form[key] === 0 || form[key] === "0") delete form[key];
      });

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

  var buttonDisabled = !Object.values(errors).every((value) => value === '');


  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Crea tu propio pokemon</h1>
        <div className={styles.cont}>
          <div>
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

          </div>
          <div>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="types" >Tipos: </label>
              <div className={styles.divInput}>
                {myTypes.map((type, index) => (
                  <div key={index}>
                    <label >
                      <input
                        type="checkbox"
                        value={type}
                        checked={form.types.includes(getTypeIndex(type))}
                        onChange={handleinputChangeCheck}
                      />
                      {type}
                    </label>
                  </div>
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
              <div><p>Preview</p>{(form.image !== "" && errors.image === "") && <div className={styles.cardMedia}><img alt="pokemon" src={form.image} /></div>}</div>
            </div>

          </div>


        </div>
        <button disabled={buttonDisabled} type='submit' className={buttonDisabled ? styles.buttonDis : styles.button}>Crear</button><br />
      </form>
    </div>
  );
}

export default Form;