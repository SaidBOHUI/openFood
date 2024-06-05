const router = require('express').Router();
const productCtrl = require('../controllers/productController');

router.get('/barcode/:barcode', productCtrl.getProductByBarcode);
router.get('/category/:category', productCtrl.searchProductsByCategory);
router.get('/alternatives/:barcode', productCtrl.getAlternativeProducts);
router.post('/saveSubstitute', productCtrl.saveSubstitute);
router.get("/", productCtrl.getProductTest);
router.get("/categories", productCtrl.getCategories);
router.get("/allergens", productCtrl.getAllergens);

module.exports = router;
