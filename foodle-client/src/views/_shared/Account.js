import React from "react";
import { Grid, Typography } from "@mui/material";
import MyFoodles from "../../components/Foodle/MyFoodles";
import { Auth } from "../../utils/auth";

const Account = () => {
  const auth = new Auth();
  return (
    <Grid container>
      <Grid item xs={12} md={6}></Grid>
      <Grid item xs={12} md={6}></Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ my: 1 }}>
          Meine Foodles
        </Typography>
        <MyFoodles uid={auth.getUser().uid} />
      </Grid>
    </Grid>
  );
};

export default Account;
