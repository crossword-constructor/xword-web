const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const WordList = sequelize.define(
  'WordList',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(WordList === sequelize.models.WordList); // true
export default WordList;