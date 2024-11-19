import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { addProduct } from "../service/cart.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Delete } from "@mui/icons-material";

export default function ProductCard({
  product,
  quantity,
  removeProductFromCart,
}: any) {
  const token = localStorage.getItem("token");
  const userData: any = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  const location = useLocation();

  const isCart: any = location.pathname.includes("/cart");

  const addProductToCart = async (productId: String) => {
    if (token) {
      try {
        const payload: any = {
          user: user._id,
          product: productId,
          quantity: 1,
        };
        await addProduct(payload);
      } catch (error) {
        console.error(error);
        toast.error("Oops something went wrong! That's on us.", {
          hideProgressBar: false,
        });
      }
    } else {
      navigate("/login");
    }
  };

  const removeProduct = async (productId: String) => {
    removeProductFromCart(productId);
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0px 5px 22px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e9e9e9",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.productImage}
        alt={product.productName}
        sx={{ bgcolor: "#f8f8f8", borderRadius: 2, objectFit: "contain" }}
      />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: product.color || "#333",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {product.productName}
          </Typography>
        </Box>
        <Box display={"flex"} gap={2} flexDirection={"column"}>
          <Box display="flex" alignItems={"center"}>
            <Typography variant="body2" color="grey">
              {product.quantityUnit}
            </Typography>
            <Typography variant="body2" color="grey">
              {product.productDescription}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            {isCart && (
              <Typography component="div" sx={{ fontWeight: "bold" }}>
                Qty {quantity} {product.productUnit}
              </Typography>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography component="div" sx={{ fontWeight: "bold" }}>
              Rs. {product.productPrice}
            </Typography>
            {!isCart ? (
              <Button
                startIcon={<ShoppingCart />}
                sx={{ ml: 2, textTransform: "none" }}
                onClick={() => addProductToCart(product._id)}
              >
                Add To Cart
              </Button>
            ) : (
              <Button
                startIcon={<Delete />}
                sx={{ ml: 2, textTransform: "none" }}
                onClick={() => removeProduct(product._id)}
              >
                Remove
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
