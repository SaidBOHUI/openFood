const Allergen = require("../models/allergenModel");
const allergenCtrl = {
  getAllergens: async (req, res) => {
    Allergen.find()
      .then((allergen) => res.status(200).json(allergen))
      .catch((err) =>
        res.status(404).json({ notFound: "Allergen non trouvé" })
      );
  },
};
module.exports = allergenCtrl;
