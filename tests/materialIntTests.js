require('should')
const request = require('supertest')
const mongoose = require('mongoose')
process.env.ENV = 'Test'
const app = require('../app.js')
const Material = mongoose.model('Material')
const agent = request.agent(app)

describe('Material Crud Test', () => {
  it('should allow a materal to be posted and return a _id', (done) => {
    const materialPost = {
      "name": "R-Plastic",
      "bioco2verbrennung": 0,
      "bioco2prod": 0,
      "biofuelco2": 0,
      "co2Deponie": 0,
      "co2recycling": 0.4,
      "co2verbrennung": 3.14,
      "dichte": 0.925,
      "energieRecycling": 1.6,
      "heizenergie": 46,
      "productionCO2": 1.79,
      "prozessenergie": 33,
      "recyclat2tesMal": true,
      "recyclierbar": true,
      "recycliert": true,
      "recyclingverfahren": "open_loop",
      "rRateHerstellung": 0,
      "a-wert pef": 0.5,
      "Erdgas": 0.35,
      "Erdöl": 1.27,
      "fossiles": 1.7,
      "Gutschrift CO2": 1,
      "Heizenergie Lower H V": 41,
      "Kohle": 0.06,
      "Kühlwasser/g": 129,
      "Prozess Strom": 1.27,
      "Prozesswärme": 0.69,
      "Prozesswasser": 1,
      "R2 WErt": 0,
      "Wasser": 130,
      "Water Consumption": 49,
      "wd_barriere": 0,
      "r_rate PEF": 0,
      "qualitätsparameter": 0
    }
    agent.post('/api/material')
      .send(materialPost)
      .expect(200)
      .end((err, results) => {
        results.body.should.have.property('_id')
        //console.log(results)
        done()
      })
  })

  

  
  after((done) => {
    app.server.close(async () => {
      await Material.deleteMany({name: 'R-Plastic'})
      await mongoose.connection.close()
      console.log("app.server is done!")
      done()
    })
  })
  
})

