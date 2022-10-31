const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandsService = async () => {
  const result = await Brand.find({}).select("-products -suppliers");
  return result;
};

exports.getBrandByIdService = async (id) => {
  const result = await Brand.findById({ _id: id });
  return result;
};

exports.updateBrandService = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, { runValidators: true });
  return result;
};
