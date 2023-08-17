const should = require('should')
const sinon = require('sinon')
const materialController = require('../controllers/materialController')

describe('Material Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty name on post', () => {
      const Material = function (material) { this.save = () => { } }
      const req = {
        body: {
          bioco2verbrennung: 0,
          bioco2prod: 0,
          biofuelco2: 0,
          co2Deponie: 0,
        }
      }
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      }
      const controller = materialController(Material)
      controller.post(req, res)
    
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`)
      res.send.calledWith('Name is required').should.equal(true)
    })
  })

})
