const createHttpError = require("http-errors");
const {
  getProductsServices,
  getProductServices,
  createProductServices,
  bulkUpdateProductService,
  updateProductByIdServices,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.service");

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    let filtersSting = JSON.stringify(filters);
    filtersSting = filtersSting.replace(/\b(gt|gte|lt|lte|eq)\b/g, (match) => `$${match}`);

    filters = JSON.parse(filtersSting);

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    const products = await getProductsServices(filters, queries);
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await getProductServices(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await createProductServices(req.body);
    res
      .status(200)
      .json({ status: "success", message: "data inserted successfully", data: product });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};

//update
exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdServices(id, req.body);
    res
      .status(200)
      .json({ status: "success", message: "successfully updated the product", data: result });
  } catch (error) {
    next(createHttpError(400, "couldn't update the product"));
  }
};

// bulk Update Product
exports.bulkUpdateProducts = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res
      .status(200)
      .json({ status: "success", message: "successfully updated the product", data: result });
  } catch (error) {
    next(createHttpError(400, "couldn't update the product"));
  }
};

// bulk delete Products
exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    if (!result.deletedCount) {
      next(createHttpError(400, "couldn't deleted the products"));
    }
    res
      .status(200)
      .json({ status: "success", message: "successfully deleted the products", data: result });
  } catch (error) {
    next(createHttpError(400, "couldn't deleted the products"));
  }
};

/* delete Product By Id */
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await deleteProductByIdService(id);
    res
      .status(200)
      .json({ status: "success", message: "successfully deleted the product", data: result });
  } catch (error) {
    next(createHttpError(400, "couldn't delete the product"));
  }
};

exports.fileUpload = async (req, res) => {
  try {
    // for single image upload
    // res.status(200).json(req.file);

    // for multiple image
    res.status(200).json(req.files);
  } catch (error) {}
};
