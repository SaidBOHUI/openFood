import { Autocomplete, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import banner from "../../assets/fruitBasket.webp";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';

const BackupPageProduit = () => {
    const [calledProducts, setCalledProducts] = useState([]);
    const [listNames, setListNames] = useState([]);
    const [nameToSearch, setNameToSearch] = useState("");
    const [showProducts, setShowProducts] = useState(false);
    const [allergens, setAllergens] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);

    useEffect(() => {
        if (allergens.length < 1) {
            getAllergen();
        }
    }, []);

    useEffect(() => {
        if (nameToSearch.length > 2) {
            getNames();
        }
    }, [nameToSearch]);

    const getAllergen = async () => {
        try {
            let response = await axios.get(`/allergen/`);
            setAllergens(response.data);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const getNames = async () => {
        try {
            let response = await axios.post(`http://localhost:8000/product/name`, { zebla: nameToSearch });
            console.log("response.data: ", response.data);
            setListNames(response.data);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const get50Products = async () => {
        try {
            console.log("get50Products called");
            const allergenString = selectedAllergens.join(',');
            let response = await axios.get(`http://localhost:8000/product/name/${nameToSearch}?allergens=${allergenString}`);
            console.log("products: ", response.data);
            setCalledProducts(response.data);
        } catch (error) {
            console.log("error: ", error);
            return error.message;
        }
    };

    const handleSearchClick = () => {
        get50Products();
        setShowProducts(true);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    width: "35%",
                    marginBottom: 5,
                    mt: "6rem"
                }}
            >
                <Autocomplete
                    sx={{ width: "100%" }}
                    id="free-solo-demo"
                    freeSolo
                    options={listNames}
                    getOptionLabel={(option) => option || ""}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Recherche de produit"
                            variant="filled"
                            InputLabelProps={{ style: { color: "white" } }}
                            InputProps={{
                                ...params.InputProps,
                                style: {
                                    color: "white",
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    borderRadius: "4px",
                                },
                                endAdornment: (
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        {params.InputProps.endAdornment}
                                    </Box>
                                ),
                            }}
                            onChange={(e) => setNameToSearch(e.target.value)}
                        />
                    )}
                />
                <IconButton
                    aria-label="search"
                    onClick={handleSearchClick}
                    sx={{ ml: 1 }}
                >
                    <SearchIcon sx={{ color: "white" }} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    width: "35%",
                    marginBottom: 5,
                }}
            >
                <Autocomplete
                    multiple
                    style={{width: "1000px"}}
                    options={allergens}
                    getOptionLabel={(option) => option.name.includes(':') ? option.name.split(':').pop() : option.name}
                    onChange={(event, value) => setSelectedAllergens(value.map(a => a.id))}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                label={option.name.includes(':') ? option.name.split(':').pop() : option.name}
                                style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Sélectionner des allergènes"
                            placeholder="Allergènes"
                            InputLabelProps={{ style: { color: "white" } }}
                            InputProps={{
                                ...params.InputProps,
                                style: {
                                    color: "white",
                                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                                    borderRadius: "4px",
                                },
                            }}
                        />
                    )}
                />
            </Box>
            <Box
                sx={{
                    display: showProducts ? "flex" : "none",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "10px",
                    overflowY: "auto",
                    height: "65vh",
                    width: "100%",
                    padding: 2,
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    {calledProducts.map((produit, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    alt={produit.name}
                                    height="140"
                                    image={produit.imageUrl}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {produit.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Marque(s): {produit.brands}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Nutri-Score: {produit.nutriscore.toUpperCase()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Magasin: {produit.stores}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href={`/produit/${produit.id}`}>Informations</Button>
                                    <Button size="small" href={`/produit/alternate/${produit.id}`}>Alternatives</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default BackupPageProduit;
