const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index'); // Import sequelize instance

class SelectedQuestion extends Model {}

SelectedQuestion.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.JSONB, // Assuming `code` is a JSON array
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'SelectedQuestion'
});

module.exports = SelectedQuestion;
