

const validate = (form, er) => {
  const errors = { ...er }
  // Email Username
  if (form.name === "") {
    errors.name = "Falta añadir nombre al Pokémon";
  } else errors.name = ""
  if (form.hp < 1 || !Number.isInteger(Number(form.hp))) {
    errors.hp = "La vida debe ser número entero y mayor a 0";
  } else errors.hp = ""
  if (form.attack < 1 || !Number.isInteger(Number(form.attack))) {
    errors.attack = "El nivel de ataque debe ser número entero y mayor a 0";
  } else errors.attack = ""
  if (form.defense < 1 || !Number.isInteger(Number(form.defense))) {
    errors.defense = "El nivel de ataque debe ser número entero y mayor a 0";
  } else errors.defense = "";

  if (form.image === undefined) form.image = "";
  if (!(form.image.includes("https://") || form.image.includes("http://"))) {
    errors.image = "El campo de imagen no puede estar vacío y debe incluir http";
  } else errors.image = ""

  //   • Tener al menos 8 caracteres
  // ~ Tener al menos 1 letra (a, b, c...)
  // • Tener al menos 1 número (1, 2, 3...)
  // • Incluir caracteres en mayúsculas y minúsculas
  // La contraseña NO debe
  // ~ Contener 4 caracteres consecutivos (p. ej.,
  // '11111", "12345", "abcde", o "qwert")

  return errors;
}

export default validate;