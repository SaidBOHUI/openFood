import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlternativeProducts, getProductByBarcode } from "../../services/productService";
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
import "../../styles/AlternativesPage.css";

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
    <Box className="alternative-products-container">
      {error && <Typography className="error-message">{error}</Typography>}
      {originalProduct && (
        <Box className="original-product">
          <Typography variant="h2">Produit original</Typography>
          <Card sx={{ marginBottom: 4 }}>
            <CardMedia
              component="img"
              alt={originalProduct.product_name || "Non spécifié"}
              height="140"
              image={originalProduct.image_url || "default_image_url.jpg"} 
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {originalProduct.product_name || "Non spécifié"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marque(s): {originalProduct.brands || "Non spécifié"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nutri-Score: {originalProduct.nutrition_grades?.toUpperCase() || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
      {alternatives.length > 0 && (
        <Box className="alternative-products-list">
          <Typography variant="h2">Alternatives</Typography>
          <Grid container spacing={2} justifyContent="center">
            {alternatives.map((alt) => (
              <Grid item key={alt.code} xs={12} sm={6} md={4} lg={3}>
                <Card className="alternative-card">
                  <CardMedia
                    component="img"
                    alt={alt.product_name || "Non spécifié"}
                    height="140"
                    image={alt.image_url || "default_image_url.jpg"}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {alt.product_name || "Non spécifié"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Marque(s): {alt.brands || "Non spécifié"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nutri-Score: {alt.nutrition_grades?.toUpperCase() || "N/A"}
                    </Typography>
                  </CardContent>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Link to={`/produits/${alt.code}`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary">Voir les détails</Button>
                    </Link>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AlternativesPage;
