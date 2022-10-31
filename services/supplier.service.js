const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSuppliersService = async () => {
  const suppliers = await Supplier.find({}).select("-products -suppliers");
  return suppliers;
};

exports.getSupplierByIdService = async (id) => {
  const supplier = await Supplier.findById({ _id: id });
  return supplier;
};

exports.updateSupplierService = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, { runValidators: true });
  return result;
};
