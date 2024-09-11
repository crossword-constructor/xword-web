const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Car = sequelize.define(
  'car',
  {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.DATE
    }
  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(Car === sequelize.models.Car); // true
export default Car;