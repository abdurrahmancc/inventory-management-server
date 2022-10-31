const router = require("express").Router();
const supplerController = require("../controllers/supplier.controller");

router.route("/").post(supplerController.createSupplier).get(supplerController.getSuppliers);

router.route("/:id").get(supplerController.getSupplierById).patch(supplerController.updateSupplier);

module.exports = router;
