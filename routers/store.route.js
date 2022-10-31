const router = require("express").Router();
const storeController = require("../controllers/store.Controller");

router.route("/").get(storeController.getStores).post(storeController.createStore);

router.route("/:id").get(storeController.getStoreById);

module.exports = router;
