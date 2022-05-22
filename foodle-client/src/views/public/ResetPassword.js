import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../utils/auth";
import ROUTES from "../../utils/routes";

const ResetPassword = () => {
  const onSubmit = (e) => {
    e.preventDefault();

    const auth = new Auth(window);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>Logo</Avatar>
      <Typography component="h1" variant="h5">
        Passwort zurücksetzen
      </Typography>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          variant="filled"
          margin="normal"
          id="email"
          label="E-Mail Adresse"
          name="email"
          autoComplete="email"
          autoFocus
          required
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Zurücksetzen
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to={ROUTES.public.login.path} variant="body2">
              Anmelden
            </Link>
          </Grid>
          <Grid item>
            <Link to={ROUTES.public.register.path} variant="body2">
              Registrieren
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResetPassword;
