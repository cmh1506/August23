const express = require('express')
const materialController = require('../controllers/materialController')

function routes(Material) {
  const materialRouter = express.Router()
  const controller = materialController(Material)
  materialRouter.route('/material')
    .post(controller.post)
    .get(controller.get)
  materialRouter.use('/material/:id', (req, res, next) => {
    Material.findById(req.params.id).then((material) => {
      if (material) {
        req.material = material
        return next()
      }
      return res.sendStatus(404)
    })
  })
  materialRouter.route('/material/:id')
    .get((req, res) => {
      return res.json(req.material)
    })
    .put((req, res) => {
      let neu = new Material(req.body)
      neu.id = req.params.id
      Material.replaceOne({ _id: req.params.id }, neu).then(n => {
        return res.json(n)
      })
    })
    .patch((req, res) => {
      const { material } = req.material
      if (req.body._id) {
        delete req.body._id
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0]
        const value = item[1]
        material[key] = value
      })
      material.save().then((material) => {
        if (material) {
          return res.json(material)
        }
        return res.sendStatus(500)
      })
    })
    .delete((req, res) => {
      req.material.deleteOne({id: req.params.id}).then(() => {
        return res.sendStatus(204)
      })
    })
  return materialRouter
}

module.exports = routes