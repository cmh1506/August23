function materialController(Material) {
  function post(req, res) {
    const material = new Material(req.body)
    if(!req.body.name){
      res.status(400)
      return res.send('Name is required')
    }
    material.save()
    res.status(201)
    return res.json(material)
  }
  function get(req, res) {
    const query = req.query;
    console.log(query)
    Material.find(query).then((materials) => {
      res.status(201)
      return res.json(materials)
    })
  }
  return { post, get }
}

module.exports = materialController;