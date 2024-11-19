import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import creamyMuffins from "../../assets/creamy_muffins.png";
import luxaDarkChocolate from "../../assets/luxa_dark_chocolate.png";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  bgColor,
  productImage,
  title,
  description,
  action,
}: any) => (
  <Card
    sx={{
      borderRadius: 2,
      backgroundColor: bgColor,
    }}
    onClick={action}
  >
    <Box display={"flex"} sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
      <CardContent>
        <Typography
          variant="h4"
          sx={{ fontFamily: "Nunito-Bold", color: "#222222" }}
        >
          {title}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ fontFamily: "Open_Sans-Regular", color: "#777777" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={productImage}
        alt={title}
        sx={{
          objectFit: "contain",
        }}
      />
    </Box>
  </Card>
);

export const BoxComponent = () => {
  const navigate = useNavigate();

  const navigateToShop = () => {
    navigate("/shop");
  };

  return (
    <Box>
      <Grid container spacing={2} size={{ md: 12 }}>
        <Grid size={{ md: 6 }}>
          <ProductCard
            bgColor="#ffead9"
            productImage={luxaDarkChocolate}
            title="Luxa Dark Chocolate"
            description="Chocolate is only the happiness that you can eat."
            action={() => navigateToShop()}
          />
        </Grid>
        <Grid size={{ md: 6 }}>
          <ProductCard
            bgColor="#e0f6f8"
            productImage={creamyMuffins}
            title="Creamy Muffins"
            description="Very tasty & creamy vanilla flavour muffins."
            action={() => navigateToShop()}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoxComponent;
