const axios = require('axios');
const User = require('../models/userModel');

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

	getProductByName: async (req, res) => {
		try {
			const response = await axios.get(
				`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${req.params.name}&search_simple=1&action=process&json=1&page_size=50&page=1`
			);

			let products = response.data.products;
            console.log("products[0]: ", products[0]);
            let cleanedProducts = products.map((product) => {
                console.log("product.stores_tags", typeof product.stores_tags);
				return {
					id: product._id || 'N/A',
					name: product.product_name_fr || 'N/A',
					brands: product.brands || 'N/A',
					countries: product.countries || 'N/A',
					customerService: product.customer_service_fr || product.customerService || 'N/A',
					allergens: product.allergens_from_ingredients || 'N/A',
					nutriscore: product.nutriscore_grade || 'N/A',
					stores: product.stores_tags ? product.stores_tags.join(', ') : 'N/A',
					conditionConservation: product.conservation_conditions_fr || product.conditionConservation || 'N/A',
					categories: product.categories_tags || 'N/A',
					nutriments: product.nutriments || 'N/A',
					labels: product.labels || 'N/A',
					imageUrl: product.image_url || 'N/A'
				}
            })
			// console.log("cleanedProducts: ", cleanedProducts);

			res.status(200).json(cleanedProducts )
		} catch (error) {
			console.error("Error fetching products:", error);
			res.status(500).json({ msg: error.message });
		}
	},

	getNamesOfProducts : async(req, res) => {
		try {
			console.log("IN");
			let {zebla} = req.body
			let blazes = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${zebla}&search_simple=1&action=process&json=1&page_size=500&fields=product_name`)
			const uniqueProductNames = [...new Set(blazes.data.products.map(p => p.product_name).filter(name => name !== "" && name.toLowerCase().includes(zebla.toLowerCase())))]
			console.log("uniqueProductNames: ", uniqueProductNames)
			res.status(200).json(uniqueProductNames )

		} catch (error) {
			console.log("error: ", error);
			res.status(500).json({ msg: error.message });
		}
	},

	// getFrenchProducts: async (req, res) => {
	// 	try {
	// 	} catch (error) {
	// 		console.log("error: ", error);
	// 		res.status(500).json({ msg: error.message });
	// 	}
	// },
};

module.exports = productCtrl;
