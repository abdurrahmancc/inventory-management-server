const productController = require("../controllers/product.controller");
const authorization = require("../middlewares/authorization");
const uploader = require("../middlewares/uploader");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

// if all route verify needed
// router.use(verifyToken)

// for multiple image upload
router.post("/file-upload", uploader.array("image"), productController.fileUpload);

// for single image upload
// router.post("/file-upload", uploader.single("image"), productController.fileUpload);

router
  .route("/")
  .get(productController.getProducts)
  .post(verifyToken, authorization("admin", "store-manager"), productController.createProduct);

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
