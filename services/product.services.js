const Product = require("../models/product.schema");

exports.getProductsServices = async (filters, queries) => {
  /* http://localhost:5000/api/v1/product?page=5&limit=3&sort=price&fields=name,unit& */
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  // const products = await Product.find({
  //   status: { $ne: "out-of-stock" },
  // });

  // const products = await Product.find({
  //   quantity: { $gt: 43 },
  // });

  // const products = await Product.find({
  //   name: { $in: ["foods", "fish"] },
  // });

  // projection / selected
  // const products = await Product.find({}, "-name -unit -_id");
  // const products = await Product.find({}).select({ name: 1, _id: 0 });

  // const products = await Product.find({}).limit(1);

  // const products = await Product.find({}).sort({ createdAt: -1 });

  // greater than or equal
  // const products = await Product.where("price")
  //   .equals(443)
  //   .where("quantity")
  //   .gte(40)
  //   .lt(100)
  //   .limit(2)
  //   .sort({ quantity: -1 });
  return { products, totalProducts, pageCount };
};

exports.getProductServices = async (id) => {
  const tours = await Product.findById({ _id: id });
  return tours;
};

exports.createProductServices = async (data) => {
  const result = await Product.create(data);
  result.logger();
  // const product = new Product(data);
  // if (product.quantity == 0) {
  //   tour.status = "out-of-stock";
  // }
  // const result = await product.save();
  return result;
};

exports.updateProductByIdServices = async (productId, data) => {
  // 1 way
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $set: data },
  //   { runValidators: true }
  // );

  // 2 way
  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();

  // 3 way
  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );
  return result;
};

/* bulk Update many Product Service */
exports.bulkUpdateProductService = async (data) => {
  // update products and same data
  /*  
    {
      "ids": ["6331e8e194400955e1e2f8bb","6331e9a9adbe53e27532067f"],
      "data": {"price": 120}
    } 
*/
  // const result = await Product.updateMany({ _id: data.ids }, data.data, { runValidators: true });

  /* 
    {
      "ids": [
              {"id": "6331e8e194400955e1e2f8bb", "data": {"price": 20}},
              {"id": "6331e9a9adbe53e27532067f", "data": {"price": 50}}
            ]
    }
  */

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = Promise.all(products);
  console.log(result);
  return result;
};

/* bulk delete many Product Service */
exports.bulkDeleteProductService = async (ids) => {
  /* 
    {
      "ids":["633234e3bec", "63323232623791"]
    }
  */
  const result = await Product.deleteMany({ _id: ids }, { runValidators: true });
  // delete all
  // const result = await Product.deleteMany({}, { runValidators: true });
  return result;
};

/* delete product by id */
exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
