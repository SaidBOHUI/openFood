const axios = require('axios')

const productCtrl = {
	getProductByBarcode: async (req, res) => {
        try {
            let products = await axios.get(`https://world.openfoodfacts.net/api/v2/product/${req.params.barcode}`)
            console.log("products: ", products.data)
            res.status(200).json(products.data)
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({msg : error.message})
        }
	},

    getProductTest : async(req, res) => {
        try {
            let products = await axios.get(`https://world.openfoodfacts.net/api/v2/search?page_size=1000&page=1`)
            console.log("products: ", products.data)
            res.status(200).json(products.data)
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({msg : error.message})
        }
    },

    getProductByCategory: async(req, res) => {
        try {
            let products = await axios.get(`https://world.openfoodfacts.net/api/v2/search?page_size=1000&page=1`)
            console.log("products: ", products.data)
            res.status(200).json(products.data)
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({msg : error.message})
        }
    },
    
    getAlternativeProducts : async(req, res) => {
        try {
            let {categories} = req.body 
            // let categories = "Beverages,Waters,Spring waters"
            let products = await axios.get(`https://world.openfoodfacts.net/api/v2/search?&categories_tags=${categories}&page_size=100&page=1`)
            res.status(200).json(products.data)
        } catch (e) {
            console.log("e: ", e);
            res.status(500).json({msg : e.message})            
        }
    }
};


module.exports = productCtrl;
