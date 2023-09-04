const express = require('express')
const userController = require('../controllers/userController')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')

function routes(User) {
  const userRouter = express.Router()
  const controller = userController(User)
  
  userRouter.route('/users')
    .get(controller.get)    
  return userRouter
}

module.exports = routes