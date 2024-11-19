import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import smoothFruit from "../../assets/smooth_fruit.svg";
import vegetablesFruitsBag from "../../assets/vegetables_fruits_bag.svg";
import bakery from "../../assets/bakery.svg";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryImage, categoryName, action }: any) => (
  <Card
    sx={{
      backgroundColor: "#eef5e4",
      borderRadius: 2,
    }}
    onClick={action}
  >
    <Box display="flex" sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
      <CardContent>
        <Typography variant="h2">{categoryName}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={categoryImage}
        sx={{
          objectFit: "contain",
        }}
      />
    </Box>
  </Card>
);

export default function Billboard() {
  const navigate = useNavigate();

  const navigateToShop = () => {
    navigate("/shop");
  };

  return (
    <Box>
      <Grid container spacing={2} size={{ md: 12 }}>
        <Grid size={{ md: 6 }}>
          <Card
            sx={{
              backgroundColor: "#e6f3fa",
              borderRadius: 2,
            }}
            onClick={()=>navigateToShop()}
          >
            <Box display="flex" sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  100% Natural
                </Typography>
                <Typography variant="h2">
                  Fresh Smoothie & Summer Juice
                </Typography>
                <Typography>
                  Best Selling Summer Juice With Natural Extracts.
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                image={smoothFruit}
                sx={{
                  objectFit: "contain",
                }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid container direction="column" spacing={2} size={{ md: 6 }}>
          <Grid size={{ md: 12 }}>
            <CategoryCard
              categoryImage={vegetablesFruitsBag}
              categoryName="Fruits & Vegetables"
              action={() => navigateToShop()}
            />
          </Grid>
          <Grid size={{ md: 12 }}>
            <CategoryCard
              categoryImage={bakery}
              categoryName="Baked Products"
              action={() => navigateToShop()}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
