const productController = require("../controller/product.controller");
const router = require("express").Router();

router.route("/").get(productController.getProducts).post(productController.createProduct);

/*-------bulk update Product By Ids ---------*/
router.route("/bulk-update").patch(productController.bulkUpdateProducts);

/*-------bulk delete Product By Ids ---------*/
router.route("/bulk-delete").delete(productController.bulkDeleteProducts);

/*------- update Product By Id ---------*/
router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
