import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
          <Link color="inherit" to="/about">
            Foodle
          </Link>{" "}
          {new Date().getFullYear()}
          {"."} Made with ❤ and Caffeine by Jan & Lukas
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
