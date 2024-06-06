const router = require('express').Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middlewares/auth.middleware');

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/refresh_token", userCtrl.refreshToken);
router.get("/infos", auth, userCtrl.getUser);

router.post("/saveSubstitutes", auth, userCtrl.saveSubstitutes);
router.get("/substitutedProducts", auth, userCtrl.getSavedSubstitutes);

module.exports = router;
