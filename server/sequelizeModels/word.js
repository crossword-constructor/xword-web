const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Word = sequelize.define(
  'Word',
  {
    wordListId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(Word === sequelize.models.Word); // true
export default Word;