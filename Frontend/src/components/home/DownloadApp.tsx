import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import sgdsApp from "../../assets/sgds_app.svg";
import playStore from "../../assets/play_store.svg";
import appStore from "../../assets/app_store.svg";

export default function DownloadApp() {
  return (
    <Box>
      <Grid
        container
        size={{ md: 12 }}
        sx={{ backgroundColor: "#fff8ea", borderRadius: "3rem" }}
      >
        <Grid
          container
          size={{ md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={sgdsApp}></img>
        </Grid>
        <Grid
          container
          size={{ md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            sx={{ flexDirection: "column", gap: "2rem", margin: "3rem" }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#222222",
              }}
            >
              Shop Faster With SGDS App
            </Typography>
            <Typography
              sx={{
                color: "#555555",
                fontSize: "1rem",
                lineHeight: "1.5rem",
              }}
            >
              Transform your grocery shopping experience with our innovative
              Grocery Mobile App, designed to make your life easier and your
              shopping trips quicker. Say goodbye to long lines and endless
              aisles!
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img src={playStore}></img>
              <img src={appStore}></img>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
