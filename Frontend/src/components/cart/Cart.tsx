import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { clearCart, getCart, removeProduct } from "../../service/cart.service";
import ProductCard from "../../shared/ProductCard";
import { toast } from "react-toastify";
import NotFound from "../../shared/notfound/NotFound";
import { createOrder } from "../../service/order.service";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const token: any = localStorage.getItem("token");
  const userData: any = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const [cart, setCart]: any = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [deliveryType, setDeliveryType] = useState("Bike Couriers");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [disableOrder, setDisableOrder] = useState(true);

  const fetchCart = async () => {
    try {
      const response: any = await getCart(user._id);
      if (response.data) {
        setCart(response.data.cartData);
        setTotalAmount(response.data.cartData.totalAmount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      navigate("/login");
    }
  }, []);

  const removeProductFromCart = async (productId: String) => {
    try {
      const payload: any = {
        user: user._id,
        product: productId,
      };
      const response = await removeProduct(payload);
      setCart(response?.data);
    } catch (error) {
      console.error(error);
      toast.error("Oops something went wrong! That's on us.", {
        hideProgressBar: false,
      });
    }
  };

  useEffect(() => {
    if (deliveryType.length > 0 && deliveryAddress.length > 0) {
      setDisableOrder(false);
    } else {
      setDisableOrder(true);
    }
  }, [deliveryType, deliveryAddress]);

  const handleDeliveryTypeChange = (e: any) => {
    setDeliveryType(e.target.value);
  };

  const handleDeliveryAddressChange = (e: any) => {
    setDeliveryAddress(e.target.value);
  };

  const placeOrder = async () => {
    try {
      const payload: any = {
        user: user._id,
        products: cart.products,
        orderStatus: "Placed",
        totalAmount: totalAmount,
        deliveryType: deliveryType,
        deliveryAddress: deliveryAddress,
      };
      const response = await createOrder(payload);
      if (response?.data.status === 1) {
        await clearCart({
          user: user._id,
        });
        navigate("/orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops something went wrong! That's on us.", {
        hideProgressBar: false,
      });
    }
  };

  const calculateFootprint = (method: any) => {
    const distance = 5; // Simulated Hardcoded will need to update based on source/ warehouse to delivery location;
    if (method === "Electric Vehicles") {
      return (distance * 0.4).toFixed(2);
    } else if (method === "Bike Couriers") {
      return 0;
    }
    return 0;
  };

  return (
    <Box
      sx={{
        margin: "10rem 0",
      }}
    >
      <Grid container spacing={2} size={{ md: 12 }}>
        <Grid container spacing={4} size={{ md: 8 }}>
          {cart?.products && cart?.products.length !== 0 ? (
            cart?.products.map((productData: any) => (
              <Grid key={productData._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProductCard
                  product={productData.product}
                  quantity={productData.quantity}
                  removeProductFromCart={removeProductFromCart}
                />
              </Grid>
            ))
          ) : (
            <NotFound title={"Cart is empty"}></NotFound>
          )}
        </Grid>
        {cart?.products && cart?.products.length !== 0 && (
          <Grid size={{ md: 4 }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 2,
                padding: "1rem",
              }}
            >
              <Select value={deliveryType} onChange={handleDeliveryTypeChange}>
                <MenuItem value={"Bike Couriers"}>Bike Couriers</MenuItem>
                <MenuItem value={"Electric Vehicles"}>
                  Electric Vehicles
                </MenuItem>
              </Select>
              <TextField
                margin="normal"
                required
                fullWidth
                id="deliveryAddress"
                placeholder="Delivery Address"
                name="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => handleDeliveryAddressChange(e)}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "1rem 0",
                  gap: "2rem",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>Total Amount </Typography>
                <Typography> Rs. {totalAmount}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "1rem 0",
                  gap: "2rem",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>
                  Carbon Footprint{" "}
                </Typography>
                <Typography>
                  {calculateFootprint(deliveryType)} kg CO2
                </Typography>
              </Box>

              <Button disabled={disableOrder} onClick={placeOrder}>
                Place Order
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
