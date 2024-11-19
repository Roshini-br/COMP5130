import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getOrders } from "../../service/order.service";
import NotFound from "../../shared/notfound/NotFound";

export default function Orders() {
  const userData: any = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response: any = await getOrders(user._id);
      if (response.data) {
        setOrders(response.data.order);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box style={{ padding: "20px", margin: "10rem 0" }}>
      <Container>
        {orders.length !== 0 ? (
          orders.map((orderItem: any, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ marginBottom: 2, boxShadow: 3 }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Order Status: {orderItem.orderStatus}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Total Amount: Rs. {orderItem.totalAmount.toFixed(2)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Delivery Type: {orderItem.deliveryType}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Delivery Address: {orderItem.deliveryAddress}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Order Date: {new Date(orderItem.createdAt).toLocaleString()}
                </Typography>
                <Divider sx={{ margin: 2 }} />
                <Typography variant="h6">Products:</Typography>
                <Grid container spacing={2}>
                  {orderItem.products.map((productItem: any, idx: any) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={productItem.product.productImage}
                          alt={productItem.product.productName}
                          sx={{ borderRadius: 1, objectFit: "contain" }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography>
                            {productItem.product.productName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: Rs.
                            {productItem.product.productPrice.toFixed(
                              2
                            )} per {productItem.product.productUnit}
                          </Typography>
                          <Typography color="text.secondary">
                            Quantity: {productItem.quantity}
                          </Typography>
                          <Typography color="text.secondary">
                            Description:{" "}
                            {productItem.product.productDescription}
                          </Typography>
                          <Typography color="text.secondary">
                            Type: {productItem.product.productType}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <NotFound title={"No orders"} />
        )}
      </Container>
    </Box>
  );
}
