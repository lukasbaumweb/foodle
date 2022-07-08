import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Auth } from "../../utils/auth";
import ROUTES from "../../utils/routes";
import SmallFoodBoy from "./../../assets/images/foodboy-small.png";

const ResetPassword = () => {
  const [values, setValues] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();

    const auth = new Auth(window);
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

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
        <img src={SmallFoodBoy} alt="Foodle Logo" />
        <Typography component="h1" variant="h5">
          Passwort zurücksetzen
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Du hast dein Passwort vergessen und möchtest gerne dein Passwort
          selbstständig zurücksetzen?
        </Typography>
        <Typography variant="body2" sx={{ my: 2 }}>
          Trag einfach deine E-Mail Adresse unten in das Textfeld ein und schau
          mit einem E-Mail Programm deiner Wahl in deinem E-Mail Postfach nach.{" "}
          <br />
          Die E-Mail mit neuen Anweisungen ist bereits unterwegs.
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            variant="filled"
            margin="normal"
            id="email"
            label="E-Mail Adresse"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={values.email}
            autoFocus
            required
            fullWidth
          />
          <Box sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Zurücksetzen
            </Button>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs>
            <Link to={ROUTES.public.login.path} variant="body2">
              Anmelden
            </Link>
          </Grid>
          <Grid item>
            <Link to={ROUTES.public.register.path} variant="body2">
              Noch keinen Account?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ResetPassword;
