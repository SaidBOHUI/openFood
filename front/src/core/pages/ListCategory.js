import { useState } from "react";
import {
  getProductByBarcode,
  searchProductsByCategory,
} from "../../services/productService";
import "../../styles/ProductSearch.css";
import { Link } from "react-router-dom";

const ListCategory = () => {
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const handleBarcodeSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await getProductByBarcode(barcode);
      setProducts([response.data]);
    } catch (error) {
      setError("Produit non trouvé.");
    }
  };

  const handleCategorySearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await searchProductsByCategory(category);
      setProducts(response.data);
    } catch (error) {
      setError("Aucun produit trouvé pour cette catégorie.");
    }
  };

  return (
    <div className="product-search-container">
      <h1>Recherche de produits</h1>

      <div className="search-section">
        <h2>Recherche par code-barres</h2>
        <form onSubmit={handleBarcodeSearch} className="search-form">
          <input
            type="text"
            placeholder="Entrer le code-barres"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            required
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>

      <div className="search-section">
        <h2>Recherche par catégorie</h2>
        <form onSubmit={handleCategorySearch} className="search-form">
          <input
            type="text"
            placeholder="Entrer la catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>

      {error && <p className="error-message">{error}</p>}

      {products.length > 0 && (
        <div className="products-list">
          <h2>Produits</h2>
          <ul>
            <li className="product-item header">
              <div className="product-name">Nom du produit</div>
              <div className="product-brand">Marque</div>
              <div className="product-grade">Note</div>
            </li>
            {products.map((product) => (
              <li key={product.code} className="product-item">
                <Link to={`/produits/${product.code}`} className="product-link">
                  <div className="product-name">
                    {product.product_name || "Non spécifié"}
                  </div>
                  <div className="product-brand">
                    {product.brands || "Non spécifié"}
                  </div>
                  <div className="product-grade">
                    <span className={`grade grade-${product.nutrition_grades}`}>
                      {product.nutrition_grades.toUpperCase()}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListCategory;
