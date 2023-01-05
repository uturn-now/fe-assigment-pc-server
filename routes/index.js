const express = require('express');
const router = express.Router();

const sizes = ['unknown', '20ft', '30ft', '40ft', '45ft']
const types = ['import', 'export']

router.get('/container-sizes', (req, res) => {
  res.json(sizes)
})

router.get('/shipment-types', (req, res) => {
  res.json(types)
})

router.get('/download-resources', function(req, res){
  const file = `${__dirname}/../public/logo.svg`;
  res.download(file); // Set disposition and send it.
});

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* GET home page. */
router.post('/', function(req, res) {
  const {size, type, locations} = req.body
  if (!size) {
    return badRequest(res, 'size')
  }
  if (!sizes.includes(size)) {
    return res.status(400).send(`'size' does not match: '${sizes.join(', ')}'.`)
  }
  if (!type) {
    return badRequest(res, 'type')
  }
  if (!types.includes(type)) {
    return res.status(400).send(`'type' does not match: '${types.join(', ')}'.`)
  }
  if (!locations) {
    return badRequest(res, 'locations')
  }
  if (!locations.start) {
    return badRequest(res, 'locations.start')
  }
  if (!locations.delivery) {
    return badRequest(res, 'locations.delivery')
  }
  if (!locations.end) {
    return badRequest(res, 'locations.end')
  }

  const data = Array.from(Array(13)).map(() => getRandomInt(200, 1000))

  return res.json({
    data,
    min: Math.min(...data),
    max: Math.max(...data),
    average: Math.round(data.reduce((prev, next) => prev + next, 0) / data.length)
  })
});

const badRequest = (res, field) => {
  return res.status(400).send(`'${field}' is required!`)
}

module.exports = router;
