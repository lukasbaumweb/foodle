import React from "react";
import { Box, Container, Typography } from "@mui/material";
import SmallFoodBoy from "../assets/images/foodboy.png";
const ComingSoon = () => {
  return (
    <Container maxWidth="sm" sx={{ pt: 2 }}>
      <Box display="flex" justifyContent="center">
        <img src={SmallFoodBoy} width="60%" alt="Foodboy" />
      </Box>
      <Typography variant="h2" textAlign="center" sx={{ mt: 2 }}>
        Coming Soon
      </Typography>
      <Typography variant="h5" textAlign="center">
        Hier entsteht ein Feature. Wir arbeiten daran und es wird in Kürze
        eingebaut.
      </Typography>
    </Container>
  );
};

export default ComingSoon;
