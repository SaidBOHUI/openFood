import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlternativeProducts } from "../../services/productService";
import "../../styles/ProductDetails.css";

const AlternativesPage = () => {
  const { id } = useParams();
  const [alternatives, setAlternatives] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlternatives = async () => {
      try {
        const response = await getAlternativeProducts(id);
        setAlternatives(response.data);
      } catch (error) {
        setError("Aucun substitut trouvé.");
      }
    };

    fetchAlternatives();
  }, [id]);

  return (
    <div className="alternative-products-container">
      {error && <p className="error-message">{error}</p>}
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
