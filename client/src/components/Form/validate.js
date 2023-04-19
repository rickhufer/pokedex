const regexEmail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

const validate = (form, er) => {
  const errors = { ...er }
  // Email Username
  if (form.username === "") errors.username = "No existe username";
  else if (form.username.length > 35) errors.username = "Alcanzó el límite de 35 caracteres"
  else if (regexEmail.test(form.username))
    errors.username = "";
  else errors.username = "Usuario no valido";

  // Password
  if (!form.password) errors.password = "Escriba su contraseña";
  else if (!(form.password.length >= 6 && form.password.length <= 10)) errors.password = "La contraseña debe estar entre 6 y 10 caracteres"
  else if (!form.password.split('').find((elem) => !isNaN(elem))) errors.password = "La contraseña debe contener al menos un número"
  else errors.password = ""

  return errors;
}

export default validate;