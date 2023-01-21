const Router = require("express").Router;
const router = Router();
const userController = require("../controller/userController");
const loginController = require("../controller/loginController");

router.get("/users", userController.findAll);
router.get("/user/:id", userController.findOne);
router.post("/user", userController.create);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

router.post("/auth", loginController.auth);

module.exports = router;
