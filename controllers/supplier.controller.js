const {
  createSupplierService,
  getSuppliersService,
  getSupplierByIdService,
  updateSupplierService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the Supplier",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSuppliersService();
    res.status(200).json({
      status: "success",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find the suppliers",
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const supplier = await getSupplierByIdService(id);
    if (!supplier) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find the suppliers",
    });
  }
};

exports.updateSupplier = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateSupplierService(id);

    if (!result.modified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update a supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the suppliers",
    });
  }
};
