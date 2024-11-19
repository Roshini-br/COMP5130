import React from "react";
import Typography from "@mui/material/Typography";
import "./Footer.css";

export default function Footer(props: any) {
  return (
    <div className="Footer">
      <Typography align="center" {...props}>
        {"Copyright © "}
        {new Date().getFullYear()}
        {" by SGDS. All Rights Reserved."}
      </Typography>
    </div>
  );
}
