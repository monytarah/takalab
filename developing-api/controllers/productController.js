const { Product, Cart } = require('../models')
const Redis = require("ioredis");
const redis = new Redis()

class ProductController {
  static addProduct (req, res) {
    const { name, quantity, price } = req.body
    Product.create({ name, quantity, price })
      .then((newProduct) => {
        res.status(201).json(newProduct)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static async addCart (req, res) {
    const ProductId = +req.body.ProductId
    const quantity = +req.body.quantity
    try {
      const redisCart = await redis.get("cart")
      let carts = JSON.parse(redisCart)

      let product = await Product.findOne({ where: { id: ProductId }})
      if (product.quantity < quantity) {
        throw({ name: 'Out of Stock' })
      } 

      if (carts) {
        let sameProduct = false
        for (let i = 0; i < carts.length; i++) {
          if (carts[i].ProductId == ProductId) {
            let newQty = carts[i].quantity + quantity
            if (product.quantity < newQty) {
              throw({ name: 'Out of Stock' })
            }
            sameProduct = true
          } 
        }

        if (!sameProduct) {
          carts.push({ ProductId, quantity })
        }

        await redis.set("cart", JSON.stringify(carts))
        res.status(201).json({ message: 'Added to cart' })
      
      } else {
        await redis.set("cart", JSON.stringify([{ ProductId, quantity }]))
        res.status(201).json({ message: 'Added to cart' })
      }

    } catch (error) {
      if (error.name === 'Out of Stock') {
        res.status(404).json({ message: 'There is not enough stock' })
      } else {
        res.status(500).json(error)
      }
    }
  }
  
  static async checkout (req, res) {
    try {
      const cartRedis = await redis.get("cart")
      const cart = JSON.parse(cartRedis)
      for (let i = 0; i < cart.length; i++) {
        await Cart.create(cart[i])
      }

      await redis.del("cart")
      res.status(200).json({ message: "Checkout success" })
      
    } catch (error) {
      res.status(500).json(error) 
    }
  }

  static async payment (req, res) {
    try {
      const cart = await Cart.findAll({ where: { paid : false }})
      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findOne({ where: { id: cart[i].ProductId }})
        await Product.update({ quantity: product.quantity - cart[i].quantity }, { where: { id: cart[i].ProductId }})
        await Cart.update({ paid: true }, { where: { id: cart[i].id }})
      }
      res.status(200).json({ message: 'Success' })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = ProductController