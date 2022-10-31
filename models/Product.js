const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      lowercase: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/liter/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide a valid image URLs",
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

//mongoose middleware for saving data: pre
productSchema.pre("save", function (next) {
  console.log("before saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
