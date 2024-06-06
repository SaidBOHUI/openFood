const router = require("express").Router();
const allergenCtrl = require("../controllers/allergenController");

router.get("/", allergenCtrl.getAllergens);

module.exports = router;
