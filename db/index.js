const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL)



const Product = conn.define('product', 
  {
    name: Sequelize.STRING
  }
)

const Category = conn.define('category', 
  {
    name: Sequelize.STRING
  }
)

Product.belongsTo(Category)
Category.hasMany(Product)


const syncAndSeed = ()=> {
  return conn.sync({force: true})
    .then(async ()=> {
      const [chocolate, onions, cheese, milk] = await Promise.all([
        Product.create({name: 'Chocolate'}),
        Product.create({name: 'Onions'}),
        Product.create({name: 'Cheese'}),
        Product.create({name: 'Milk'})
      ])
      const [desserts, vegetables, dairy] = await Promise.all([
        Category.create({name: 'Desserts'}),
        Category.create({name: 'Vegetables'}),
        Category.create({name: 'Dairy'})
      ])
      await Promise.all([
        desserts.addProduct([chocolate]),
        vegetables.addProduct([onions]),
        dairy.addProducts([cheese, milk])
      ])
    })
}


module.exports = {
  syncAndSeed,
  models: {
    Product,
    Category
  }
}
