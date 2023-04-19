import { useState } from "react";
import styles from "./Form.module.css"
import validate from "./validate"

const Form = (props) => {
  // const [form, setForm] = useState({
  //   username: "",
  //   password: "",
  // });
  // const [errors, setErrors] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleinputChange = (event) => {
  //   const prop = event.target.name;
  //   const val = event.target.value;

  //   setForm({ ...form, [prop]: val, });
  //   setErrors(validate({ ...form, [prop]: val, }, errors));
  // }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   props.login(form);

  //   if (errors.username === "" && errors.password === "") {
  //     alert("Bienvenido");
  //     setErrors({ username: "", password: "" })
  //     setForm({ username: "", password: "" })
  //   }
  //   else alert("Datos incorrectos")
  // }

  // return (
  //   <div className={styles.formContainer}>
  //     <form onSubmit={handleSubmit}>
  //       <h1>Bienvenidos</h1><hr /><br />
  //       <div className={styles.group}>
  //         <label className={styles.label} htmlFor="username" >Email: </label>
  //         <div>
  //           <input
  //             type="text"
  //             name='username'
  //             className={errors.username ? styles.errors : styles.success}
  //             value={form.username}
  //             onChange={handleinputChange} />
  //           <br /><span className={styles.inputMessage}>{errors.username && errors.username}</span>
  //         </div>
  //       </div>
  //       <div className={styles.group}>
  //         <label className={styles.label} htmlFor="password">Contraseña: </label>
  //         <div>
  //           <input
  //             type="text"
  //             name='password'
  //             className={errors.password ? styles.errors : styles.success}
  //             value={form.password}
  //             onChange={handleinputChange} />
  //           <br /><span className={styles.inputMessage}>{errors.password}</span>
  //         </div>
  //       </div>
  //       <button type='submit' className={styles.button}>Iniciar sesión</button>
  //     </form>
  //   </div>
  // );
}

export default Form;