import { DataTypes } from  'sequelize'
import { sequelize } from '.'

const Dog = sequelize.define('Dog', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true
    }
  },
  color: {
    type: DataTypes.STRING,
  },
  breed: {
    type: DataTypes.STRING,
  },
  weight: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true
    }
  },
})

export default Dog