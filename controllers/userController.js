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
  return { post }
}

module.exports = userController;
