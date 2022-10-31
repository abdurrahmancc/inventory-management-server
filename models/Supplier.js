const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name!"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters!"],
      maxLength: [100, "Name is too large!"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please a valid Email!"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please provide a valid phone number",
        },
      },
    ],
    emergencyContactNumber: {
      type: String,
      required: [true, "Please provide a emergency contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid emergency phone number",
      },
    },
    tradeLicenseNumber: {
      type: Number,
      trim: true,
      required: [true, "Please provide your trade license number"],
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide your present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide your permanent address"],
    },
    location: {
      type: String,
      required: [true, "Please provide your location"],
      enum: {
        values: [
          "dhaka",
          "rajshahi",
          "chattogram",
          "sylhet",
          "khulna",
          "barishal",
          "rangpur",
          "mymensingh",
        ],
        message: "{VALUE} is not a correct division!",
      },
    },
    imageURL: {
      type: String,
      required: [true, "image must be required"],
      validate: [validator.isURL, "Please provide a valid url"],
    },
    nationalIdImageURL: {
      type: String,
      required: [true, "national ID card image URL must be required"],
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
