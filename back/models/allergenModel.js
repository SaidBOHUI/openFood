const { Schema, model } = require("mongoose");

const allergenSchema = new Schema(
  {
    id: {
      type: String,
      required: false,
    },

    know: {
      type: Number,
      required: false,
    },

    name: {
      type: String,
      required: false,
    },

    products: {
      type: Number,
      required: true,
    },

    url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Allergens = model("Allergen", allergenSchema);
module.exports = Allergens;
