import { useEffect, useState } from "react";
import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getProducts } from "../../service/product.service";
import ProductCard from "../../shared/ProductCard";
import NotFound from "../../shared/notfound/NotFound";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sustainabilityCriteria, setSustainabilityCriteria] = useState("all");

  async function fetchProducts() {
    try {
      const response: any = await getProducts();
      if (response.data) {
        setProducts(response.data.productData);
        setFilteredProducts(response.data.productData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSustainabilityCriteriaChange = (event: any) => {
    const type = event.target.value;
    setSustainabilityCriteria(type);
    if (type !== "all") {
      const filtered = products.filter(
        (product: any) => product.productType === type
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <Container sx={{ margin: "10rem 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "0 0 1rem 0",
          gap: "1rem",
        }}
      >
        <Typography>Sustainability Criteria</Typography>
        <Select
          value={sustainabilityCriteria}
          onChange={handleSustainabilityCriteriaChange}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"organic"}>Organic</MenuItem>
          <MenuItem value={"locally-sourced"}>Locally Sourced</MenuItem>
          <MenuItem value={"eco-friendly-packaging"}>
            Eco-friendly Packaging
          </MenuItem>
        </Select>
      </Box>
      <Grid container spacing={4}>
        {filteredProducts.length !== 0 ? (
          filteredProducts.map((product: any) => (
            <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <NotFound title={"No Product"}></NotFound>
        )}
      </Grid>
    </Container>
  );
}
