import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlternativeProducts, getProductByBarcode } from "../../services/productService";
import "../../styles/ProductDetails.css";

const AlternativesPage = () => {
  const { id } = useParams();
  const [originalProduct, setOriginalProduct] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOriginalProduct = async () => {
      try {
        const response = await getProductByBarcode(id);
        setOriginalProduct(response.data);
      } catch (error) {
        setError("Produit original non trouvé.");
      }
    };

    const fetchAlternatives = async () => {
      try {
        const response = await getAlternativeProducts(id);
        setAlternatives(response.data);
      } catch (error) {
        setError("Aucun substitut trouvé.");
      }
    };

    fetchOriginalProduct();
    fetchAlternatives();
  }, [id]);

  return (
    <div className="alternative-products-container">
      {error && <p className="error-message">{error}</p>}
      {originalProduct && (
        <div className="original-product">
          <h2>Produit original</h2>
          <div className="product-details">
            <div className="product-name">
              {originalProduct.product_name || "Non spécifié"}
            </div>
            <div className="product-brand">
              {originalProduct.brands || "Non spécifié"}
            </div>
            <div className="product-grade">
              <span className={`grade grade-${originalProduct.nutrition_grades}`}>
                {originalProduct.nutrition_grades?.toUpperCase() || "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}
      {alternatives.length > 0 && (
        <div className="alternative-products-list">
          <h2>Alternatives</h2>
          <ul>
            {alternatives.map((alt) => (
              <li key={alt.code} className="alternative-item">
                <Link to={`/produits/${alt.code}`} className="alternative-link">
                  <div className="alternative-name">
                    {alt.product_name || "Non spécifié"}
                  </div>
                  <div className="alternative-brand">
                    {alt.brands || "Non spécifié"}
                  </div>
                  <div className="alternative-grade">
                    <span className={`grade grade-${alt.nutrition_grades}`}>
                      {alt.nutrition_grades?.toUpperCase() || "N/A"}
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

export default AlternativesPage;
