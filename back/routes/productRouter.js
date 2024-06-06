const router = require("express").Router();
const productCtrl = require("../controllers/productController");
const auth = require("../middlewares/auth.middleware");

router.get("/barcode/:barcode", productCtrl.getProductByBarcode);
router.get("/category/:category", productCtrl.searchProductsByCategory);
router.get("/", productCtrl.getProductTest);
router.get("/alternatives", productCtrl.getAlternativeProducts);
router.get("/categories", productCtrl.getCategories);
router.get("/allergens", productCtrl.getAllergens);
router.get("/name/:name", productCtrl.getProductByName);
router.post("/name/", productCtrl.getNamesOfProducts);

module.exports = router;
