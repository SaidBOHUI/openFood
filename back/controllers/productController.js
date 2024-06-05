const axios = require("axios");

const productCtrl = {
  getProductByBarcode: async (req, res) => {
    try {
      const { barcode } = req.params;
      const response = await axios.get(
        `https://world.openfoodfacts.net/api/v2/product/${barcode}`
      );
      if (!response.data.product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.status(200).json(response.data.product);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: error.message });
    }
  },

  searchProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const response = await axios.get(
        `https://world.openfoodfacts.net/api/v2/search?categories_tags=fr:${category}&page_size=100&fields=product_name,brands,nutrition_grades,code`
      );
      if (!response.data.products || response.data.products.length === 0) {
        return res
          .status(404)
          .json({ msg: "No products found for this category" });
      }
      res.status(200).json(response.data.products);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: error.message });
    }
  },

  getProductTest: async (req, res) => {
    try {
      let products = await axios.get(
        `https://world.openfoodfacts.net/api/v2/search?page_size=1000&page=1`
      );
      console.log("products: ", products.data);
      res.status(200).json(products.data);
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ msg: error.message });
    }
  },

  getAlternativeProducts: async (req, res) => {
    try {
      let { categories } = req.body;
      // let categories = "Beverages,Waters,Spring waters"
      let products = await axios.get(
        `https://world.openfoodfacts.net/api/v2/search?categories_tags=${categories}&page_size=100&page=1`
      );
      res.status(200).json(products.data);
    } catch (e) {
      console.log("e: ", e);
      res.status(500).json({ msg: e.message });
    }
  },

  getCategories: async (req, res) => {
    let page = 1;
    let keepFetching = true;
    const arrCate = [];
    const prefix = req.query.prefix || "";

    try {
      while (keepFetching) {
        let products = await axios.get(
          `https://world.openfoodfacts.org/categories.json?page_size=10000&page=${page}`
        );
        console.log(
          "products: ",
          products.data.tags,
          products.data.tags.length
        );

        if (products.data.tags.length !== 0) {
          let filteredCate = products.data.tags
            .filter(
              (product) =>
                product.id.startsWith("fr:") &&
                product.id.substring(3).startsWith(prefix)
            )
            .map((product) => {
              return {
                id: product.id,
                name: product.name.startsWith("fr:")
                  ? product.name.substring(3)
                  : product.name,
                known: product.known,
                products: product.products,
                url: product.url,
              };
            });

          arrCate.push(...filteredCate);
          page++;
        } else {
          keepFetching = false;
        }
      }
      res.status(200).json({ categories: arrCate });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ msg: error.message });
    }
  },

  getAllergens: async (req, res) => {
    let page = 1;
    let keepFetching = true;
    const arrAllergens = [];
    try {
      while (keepFetching) {
        let allergens = await axios.get(
          `https://world.openfoodfacts.org/allergens.json?page_size=10000&page=${page}`
        );
        console.log(
          "allergens: ",
          allergens.data.tags,
          allergens.data.tags.length
        );
        if (allergens.data.tags.length !== 0) {
          arrAllergens.push(...allergens.data.tags);
          page++;
        } else {
          keepFetching = false;
        }
      }
      res.status(200).json({ allergens: arrAllergens });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
