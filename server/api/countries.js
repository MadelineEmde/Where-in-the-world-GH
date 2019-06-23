const router = require('express').Router()
const {Country} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const targetCountry = await Country.findByPk(req.params.id)
    res.json(targetCountry)
  } catch (err) {
    next(err)
  }
})
