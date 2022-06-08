import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../utils/auth";
import ROUTES from "../../utils/routes";

const Register = () => {
  const onSubmit = (e) => {
    e.preventDefault();

    const auth = new Auth(window);
  };

  return (
    <Container maxWidth="sm">
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
          Registrieren
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="filled"
            margin="normal"
            id="username"
            label="Benutzername"
            name="username"
            autoComplete="username"
            autoFocus
            required
            fullWidth
          />
          <TextField
            variant="filled"
            margin="normal"
            id="email"
            label="E-Mail Adresse"
            name="email"
            autoComplete="email"
            required
            fullWidth
          />
          <TextField
            variant="filled"
            margin="normal"
            name="password"
            label="Passwort"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
          />
          <TextField
            variant="filled"
            margin="normal"
            name="repeat-password"
            label="Passwort wiederholen"
            type="repeat-password"
            id="repeat-password"
            autoComplete="repeat-password"
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrieren
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={ROUTES.public.login.path} variant="body2">
                Anmelden
              </Link>
            </Grid>
            <Grid item>
              <Link to={ROUTES.public.resetPassword.path} variant="body2">
                Passwort vergessen?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
