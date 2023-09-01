const express = require('express')
const userController = require('../controllers/userController')
const passport = require('passport')

function routes(User) {
  const authRouter = express.Router()
  const controller = userController(User)
  
  authRouter.route('/signUp')
    .post(controller.post)    
  return authRouter
}

module.exports = routes