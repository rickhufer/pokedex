
const validate = (form, er) => {
  const errors = { ...er }

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

  return errors;
}

export default validate;