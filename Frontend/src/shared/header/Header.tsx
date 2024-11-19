import React from "react";
import "./Header.css";
import Popover from "@mui/material/Popover";
import { Login, Person } from "@mui/icons-material";
import { Logout } from "@mui/icons-material";
import { ManageAccounts } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import sgdsLogo from "../../assets/sgds_logo.svg";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

export default function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <AppBar color="transparent" elevation={0}>
      <Box className="Header">
        <img
          src={sgdsLogo}
          alt="SGDS Logo"
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        />
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => navigate("/cart")}>
            <ShoppingCartIcon />
          </IconButton>
          {localStorage.getItem("token") ? (
            <IconButton onClick={(event) => handleClick(event)}>
              <Person />
            </IconButton>
          ) : (
            <Button
              className="Header-btn"
              startIcon={<Login />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "1rem",
          }}
        >
          <Button
            className="Header-btn"
            startIcon={<ManageAccounts />}
            onClick={() => navigate("/profile")}
          >
            Manage Profile
          </Button>
          <Button
            className="Header-btn"
            startIcon={<Person />}
            onClick={() => navigate("/orders")}
          >
            Your Order
          </Button>
          <Button
            className="Header-btn"
            startIcon={<Logout />}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </AppBar>
  );
}
