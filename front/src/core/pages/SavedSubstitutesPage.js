import React, { useEffect, useState } from "react";
import { getSavedSubstitutes } from "../../services/productService";
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../../styles/SavedSubstitutesPage.css";

const SavedSubstitutesPage = () => {
  const [savedSubstitutes, setSavedSubstitutes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedSubstitutes = async () => {
      try {
        const response = await getSavedSubstitutes();
        setSavedSubstitutes(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des substituts enregistrés.");
      }
    };

    fetchSavedSubstitutes();
  }, []);

  return (
    <Box className="saved-substitutes-container">
      {error && <Typography className="error-message">{error}</Typography>}
      <Typography variant="h2">Mes Substituts Enregistrés</Typography>
      <Grid container spacing={2} justifyContent="center">
        {savedSubstitutes.map((sub, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="substitute-card">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Produit Original: {sub.originalProduct}
                </Typography>
                <Typography variant="h6">Alternatives:</Typography>
                {sub.alternatives.map((alt, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    <Link to={`/produits/${alt.code}`} style={{ textDecoration: 'none' }}>
                      {alt.product_name || "Non spécifié"}
                    </Link>
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SavedSubstitutesPage;
