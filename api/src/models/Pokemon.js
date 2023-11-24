const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'pokemon',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        // nombre
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: {
        // vida
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attack: {
        // ataque
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      defense: {
        // defensa
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      speed: {
        // velocidad
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      height: {
        // altura
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      weight: {
        // peso
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      image: {
        // imagen
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isUrl: true },
      },
      custom: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false },
  );
};
