const express = require('express')
const app = express()
const path = require('path')
const db = require('./db')
const { Product, Category } = db.models

const port = process.env.PORT || 3000 
app.listen(port, ()=> console.log(`Now listening to port: ${port}`))



app.use('/dist', express.static(path.join(__dirname, 'dist')))

  
app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'))
})


app.get('/api/categories', (req, res, next)=> {
  Category.findAll({
    include: [ Product ]
  })
    .then(departments => res.send(departments))
    .catch(next)
})

app.get('/api/categories/:id', (req, res, next)=> {
  Category.findById(req.params.id, {
    include: [ Product ]
  })
    .then(department => res.send(department))
    .catch(next)
})

db.syncAndSeed()
  .then(()=> console.log('Synced and Seeded'))

