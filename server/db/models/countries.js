const Sequelize = require('sequelize')
const db = require('../db')

const Country = db.define('country', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  countryId: {
    type: Sequelize.STRING,
    allowNull: false
  },

  continent: {
    type: Sequelize.ENUM(
      'Africa',
      'Asia',
      'Europe',
      'North America',
      'South America',
      'Oceania'
    ),
    allowNull: false
  },
  hint: {
    type: Sequelize.STRING
  }
})

module.exports = Country
