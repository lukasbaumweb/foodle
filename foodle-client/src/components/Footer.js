import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../utils/routes";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        pt: 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {"© Copyright "}
          <Link color="inherit" to={ROUTES.public.about.path}>
            Foodle
          </Link>
          {` ${new Date().getFullYear()} -`}
          <Link color="inherit" to={ROUTES.public.changeLog.path}>
            {" Version: "}
            {process.env.REACT_APP_FOODLE_VERSION}
          </Link>
          {" - "}
          <Link color="inherit" to={ROUTES.public.impressum.path}>
            Impressum
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
