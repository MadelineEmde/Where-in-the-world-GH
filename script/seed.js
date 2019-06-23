'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Country} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const AFG = await Country.create({
    name: 'Afghanistan',
    countryId: 'AFG',
    continent: 'Asia',
    hint:
      "This country's national sport is called “Buzkashi” or “goat-grabbing” and is regarded as the wildest game in the world!"
  })
  const AGO = await Country.create({
    name: 'Angola',
    countryId: 'AGO',
    continent: 'Africa',
    hint:
      'This country was formerly Portuguese colony but gained self-rule in 1975!'
  })

  const ALB = await Country.create({
    name: 'Albania',
    countryId: 'ALB',
    continent: 'Asia',
    hint: 'Mother Teresa is the country’s heroine and sole Nobel laureate!'
  })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
