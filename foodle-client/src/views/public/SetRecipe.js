import React from "react";
import { Container, Grid } from "@mui/material";
import Chef from "../../assets/svg/chef.svg";

const SetRecipe = () => {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <img src={Chef} alt="Rezeptebild" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Container>
  );
};

export default SetRecipe;
