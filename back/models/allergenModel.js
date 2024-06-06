const { Schema, model } = require("mongoose");

const allergenSchema = new Schema(
  {
    id: {
      type: String,
      required: false,
      trim: true,
    },

    know: {
      type: Int32Array,
      required: false,
    },

    name: {
      type: String,
      trim: true,
    },

    products: {
      type: Int32Array,
      required: true,
    },

    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Allergens = model("Allergen", allergenSchema);
module.exports = Allergens;
