import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import FoodlesByAuthor from "../../components/Foodle/FoodlesByAuthor";
import { Auth } from "../../utils/auth";

const MyFoodles = () => {
  const auth = new Auth();
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ my: 1 }}>
            Meine Foodles
          </Typography>
          <FoodlesByAuthor uid={auth.getUser().uid} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyFoodles;
