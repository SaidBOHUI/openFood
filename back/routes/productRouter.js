const router = require('express').Router();
const productCtrl = require('../controllers/productController')
const auth = require('../middlewares/auth.middleware')


router.get("/barcode/:barcode", productCtrl.getProductByBarcode);
router.get("/", productCtrl.getProductTest);
router.get("/alternatives", productCtrl.getAlternativeProducts);


module.exports = router