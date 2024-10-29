const router = require("express").Router();

const userController = require("../controllers/userController")

// router.post("", shopController.createShop);
// router.get("", shopController.getAllShop);
// router.get("/:id", shopController.getShopById);
// router.patch("/:id", shopController.updateShop);
// router.delete("/:id", shopController.deleteShop);

router.get("", userController.findUsers)
router.get("", userController.findUserById)
module.exports = router;
