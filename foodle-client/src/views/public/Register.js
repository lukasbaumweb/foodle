import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../utils/auth";
import { capitalize, isObjectEmpty } from "../../utils/functions";
import ROUTES from "../../utils/routes";
import { translate } from "../../utils/translater";
import SmallLogo from "./../../assets/images/foodles-small.png";

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    errors: {},
  });

  const validate = () => {
    const errors = {};

    if (values.firstName.trim().length === 0) {
      errors["firstName"] = translate("validation-error/firstName-missing");
    }
    if (values.lastName.trim().length === 0) {
      errors["lastName"] = translate("validation-error/lastName-missing");
    }

    if (values.email.trim().length === 0) {
      errors["email"] = translate("validation-error/email-missing");
    }

    if (values.password.trim().length === 0) {
      errors["password"] = translate("validation-error/password-missing");
    }
    console.log(errors);
    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setValues({ ...values, loading: true });

    const auth = new Auth(window);
  };

  const generateUsername = () => {
    const firstName = capitalize(values.firstName.toLocaleLowerCase());
    const lastName = capitalize(values.lastName.toLocaleLowerCase());

    const username = `${firstName} ${lastName}`;

    return username;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);

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
        <img src={SmallLogo} alt="Foodle Logo" />

        <Typography variant="body1" sx={{ mt: 2 }}>
          Du hast noch keinen Account, möchtest aber trotzdem deine Rezepte
          speichern und teilen?
        </Typography>
        <Typography variant="body2" sx={{ my: 2 }}>
          Trage einfach deine Daten unten ein und beginne mit deiner Foodle
          Erfahrung! Wir werden dir deinen Benutzernamen aus deinen persönlichen
          Daten generieren.
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                margin="normal"
                id="firstName"
                label="Vorname"
                name="firstName"
                autoComplete="given-name"
                onChange={handleChange}
                value={values.firstName}
                error={values.errors["firstName"]?.length > 0}
                helperText={values.errors["firstName"]}
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                margin="normal"
                id="lastName"
                label="Nachname"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                error={values.errors["firstName"]?.length > 0}
                helperText={values.errors["firstName"]}
                autoComplete="family-name"
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <TextField
            variant="filled"
            margin="normal"
            id="username"
            label="Benutzername"
            name="username"
            autoComplete="username"
            InputProps={{
              readOnly: true,
            }}
            value={generateUsername()}
            fullWidth
            helperText="Der Benutzername wird automatisch erstellt"
          />
          <TextField
            variant="filled"
            margin="normal"
            id="email"
            label="E-Mail Adresse"
            name="email"
            autoComplete="email"
            error={values.errors["email"]?.length > 0}
            helperText={values.errors["email"]}
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
            error={values.errors["email"]?.length > 0}
            helperText={values.errors["email"]}
            required
            fullWidth
          />
          <TextField
            variant="filled"
            margin="normal"
            name="repeat-password"
            label="Passwort wiederholen"
            type="password"
            id="repeat-password"
            autoComplete="repeat-password"
            error={values.errors["repeat-password"]?.length > 0}
            helperText={values.errors["repeat-password"]}
            required
            fullWidth
          />
          {values.errors.all && (
            <Alert severity="error">{values.errors.all}</Alert>
          )}
          <Box sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Registrieren
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link to={ROUTES.public.login.path} variant="body2">
                Bereits registriert?
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
