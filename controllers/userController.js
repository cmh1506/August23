const connectEnsureLogin = require('connect-ensure-login')

function userController(User){
  function post(req, res) {
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
      if (err) {
          res.json({ success: false, message: "Your account could not be saved. Error: " + err });
      }
      else {
          req.login(user, (er) => {
              if (er) {
                  res.json({ success: false, message: er });
              }
              else {
                  res.json({ success: true, message: "Your account has been saved" });
              }
          });
      }
  });
    
  }
  function get(req, res){
    if (req.user) {
        const query = req.query; 
        console.log("connectEnsureLogin.ensureLoggedIn(): ", connectEnsureLogin.ensureLoggedIn()) 
        console.log("user: ", req.user)
        User.find(query).then((users) => {
          res.status(201)
          return res.json(users)
        })
      } else {
        res.send('login is required')
      }
  }
  return { get, post }
}

module.exports = userController;
