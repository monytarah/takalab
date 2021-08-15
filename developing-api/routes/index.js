const router = require('express').Router()
const ProductController = require('../controllers/productController')
const UserController = require('../controllers/userController')
const auth = require('../middlewares/authentication')

router.post('/login', UserController.login)
router.use(auth)
router.post('/product', ProductController.addProduct)
router.post('/cart', ProductController.addCart)
router.post('/checkout', ProductController.checkout)
router.post('/payment', ProductController.payment)

module.exports = router