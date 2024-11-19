import Billboard from "./Billboard";
import Sweets from "./Sweets";
import DownloadApp from "./DownloadApp";
import Grid from "@mui/material/Grid2";

export default function Home() {
  return (
    <Grid container sx={{ margin: "10rem 0", gap: "3rem" }}>
      <Billboard />
      <Sweets />
      <DownloadApp />
    </Grid>
  );
}
