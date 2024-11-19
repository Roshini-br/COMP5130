import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Register.css";
import { Box, Button, Card, Typography } from "@mui/material";
import sgdsLogo from "../../assets/sgds_logo.svg";
import { useNavigate } from "react-router-dom";
import { register } from "../../service/auth.service";
import { toast } from "react-toastify";

export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [disableRegister, setDisableRegister] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Email and Password validation
    email.length > 0 && emailRegex.test(email)
      ? setValidEmail(true)
      : setValidEmail(false);
    password.length > 6 ? setValidPassword(true) : setValidPassword(false);

    validEmail && validPassword
      ? setDisableRegister(false)
      : setDisableRegister(true);
  }, [email, password, validEmail, validPassword]);

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value);
  };

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
        name: firstname + " " + lastname,
        email: email,
        password: password,
      };
      const response: any = await register(payload);
      if (response?.data.status === 1) {
        toast.success(response?.data.message, {
          hideProgressBar: false,
        });
        navigate("/login");
      } else {
        toast.error(response?.data.message, {
          hideProgressBar: false,
        });
      }
    } catch (error) {
      toast.error("Oops something went wrong! That's on us.", {
        hideProgressBar: false,
      });
    }
  };

  return (
    <Box className="Register-container">
      <Card>
        <Box style={{ margin: "2rem" }}>
          <img
            src={sgdsLogo}
            alt="SGDS Logo"
            style={{ width: "150px", height: "100px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <h1>Register</h1>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              placeholder="Firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => handleFirstNameChange(e)}
              sx={{
                "&:focus-within fieldset, &:focus-visible fieldset": {
                  borderColor: "#228C22!important",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              placeholder="Lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => handleLastNameChange(e)}
              sx={{
                "&:focus-within fieldset, &:focus-visible fieldset": {
                  borderColor: "#228C22!important",
                },
              }}
            />
          </Box>

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
          <Box className="Register-btn">
            <Button disabled={disableRegister} onClick={handleSubmit}>
              Register
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <Typography>Already have a account?</Typography>
            <Typography
              sx={{ color: "#228C22", fontWeight: "700" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
