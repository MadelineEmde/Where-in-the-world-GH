const Sequelize = require('sequelize')
const db = require('../db')

const Country = db.define('county', {
  countryCode: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  traveled: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  journal: {
    type: Sequelize.TEXT
  },
  post: {
    type: Sequelize.TEXT
  }
})

module.exports = Country
