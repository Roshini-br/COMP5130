import { Box, Typography } from "@mui/material";

export default function Profile() {
  const userData: any = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  return (
    <Box sx={{ padding: "20px", margin: "10rem 0", textAlign: "center" }}>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6">{user.email}</Typography>
    </Box>
  );
}
