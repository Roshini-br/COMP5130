import "./NotFound.css";
import { Box, Button, Typography } from "@mui/material";
import sgdsLogo from "../../assets/sgds_logo.svg";
import notFound from "../../assets/10940652.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFound({ title, message }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const isDefinedRoute = [
    "/",
    "/shop",
    "/profile",
    "/cart",
    "/orders",
  ].includes(location.pathname);

  return (
    <Box className="Not-found">
      {!isDefinedRoute && (
        <Box
          component="img"
          src={sgdsLogo}
          sx={{
            height: "100px",
            width: "200px",
            objectFit: "contain",
          }}
        />
      )}
      <Box
        component="img"
        src={notFound}
        sx={{
          height: "300px",
          width: "300px",
          objectFit: "contain",
        }}
      />
      <Typography variant="h5">
        {title
          ? title
          : "Oops! It looks like what you're looking for doesn't exist."}
      </Typography>
      {!isDefinedRoute && (
        <Typography>
          {message ? message : "Here are a few ways to get back on."}
        </Typography>
      )}
      {!isDefinedRoute && (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button onClick={() => navigate("/shop")}>Shop</Button>
        </Box>
      )}
    </Box>
  );
}
