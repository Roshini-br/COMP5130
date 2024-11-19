import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Login.css";
import { Box, Button, Card, Typography } from "@mui/material";
import sgdsLogo from "../../assets/sgds_logo.svg";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/auth.service";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Email and Password validation
    email.length > 0 && emailRegex.test(email)
      ? setValidEmail(true)
      : setValidEmail(false);
    password.length > 6 ? setValidPassword(true) : setValidPassword(false);

    validEmail && validPassword
      ? setDisableLogin(false)
      : setDisableLogin(true);
  }, [email, password, validEmail, validPassword]);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        email: email,
        password: password,
      };
      const response: any = await login(payload);
      if (response?.data.status === 1) {
        toast.success(response?.data.message, {
          hideProgressBar: false,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);

        const userData = response.data.userData;
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/shop");
      } else {
        toast.error(response?.data.message, {
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops something went wrong! That's on us.", {
        hideProgressBar: false,
      });
    }
  };

  return (
    <Box className="Login-container">
      <Card sx={{ height: "90vh" }}>
        <Box style={{ margin: "2rem" }}>
          <img
            src={sgdsLogo}
            alt="SGDS Logo"
            style={{ width: "150px", height: "100px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <h1>Hey, Welcome!</h1>
          <h3>We are very happy to see you!</h3>
          <h1>Login</h1>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email e.g. sample@user.com"
            name="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            placeholder="Password e.g. ********"
            name="password"
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          />
          <Box className="Login-btn">
            <Button disabled={disableLogin} onClick={handleSubmit}>
              Login
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <Typography>New to SGDS?</Typography>
            <Typography
              sx={{ color: "#228C22", fontWeight: "700" }}
              onClick={() => navigate("/register")}
            >
              Register
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
