const Router = require("express").Router;
const router = Router();
const auth = require("../config/middleware/jwt-authentication/Auth");
const userController = require("../controller/userController");
const loginController = require("../controller/loginController");

router.post("/auth", loginController.auth);

router.get("/users", auth, userController.findAll);
router.get("/user/:id", auth, userController.findOne);
router.post("/user", auth, userController.create);
router.put("/user/:id", auth, userController.update);
router.delete("/user/:id", auth, userController.delete);

module.exports = router;
