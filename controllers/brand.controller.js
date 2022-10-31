const {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the brand",
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const result = await getBrandsService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the brand",
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const result = await getBrandByIdService(req.params.id);

    if (!result) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find with this id",
      });
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the brand",
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    console.log(req.params.id, req.body);
    const result = await updateBrandService(req.params.id, req.body);

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the brand with this id",
      });
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't updated the brand",
    });
  }
};
