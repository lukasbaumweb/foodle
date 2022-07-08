import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Auth } from "../../utils/auth";
import { isObjectEmpty } from "../../utils/functions";
import ROUTES from "../../utils/routes";
import { CODES, translate } from "../../utils/translater";
import SmallFoodBoy from "./../../assets/images/foodboy-small.png";

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

    if (values.username.trim().length === 0) {
      errors["username"] = translate("validation-error/username-missing");
    }

    if (values.email.trim().length === 0) {
      errors["email"] = translate("validation-error/email-missing");
    }

    if (values.password.length === 0) {
      errors["password"] = translate("validation-error/password-missing");
    } else if (values.password.length < 8) {
      errors["password"] = translate("validation-error/password-too-short");
    }

    if (values.repeatPassword.length === 0) {
      errors["repeatPassword"] = translate("validation-error/password-missing");
    } else if (values.repeatPassword.length < 8) {
      errors["repeatPassword"] = translate(
        "validation-error/password-too-short"
      );
    }

    if (
      values.password.length > 7 &&
      values.repeatPassword.length > 7 &&
      values.password.length !== values.repeatPassword.length
    ) {
      errors["password"] = translate(
        "validation-error/password-does-not-match"
      );
      errors["repeatPassword"] = translate(
        "validation-error/password-does-not-match"
      );
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // setValues({ ...values, loading: true, errors: {} });

    const auth = new Auth();

    auth
      .register({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((result) => {
        window.location.href = ROUTES.private.home.path;
      })
      .catch((err) => {
        console.error(err);
        setValues({
          ...values,
          errors: { all: translate(err.message) },
          loading: false,
        });
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (values.loading) return <Loader />;

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

        <Typography variant="body1" sx={{ mt: 2 }}>
          Du hast noch keinen Account, möchtest aber trotzdem deine Foodles
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
                error={values.errors["lastName"]?.length > 0}
                helperText={values.errors["lastName"]}
                autoComplete="family-name"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                margin="normal"
                id="username"
                label="Benutzername"
                name="username"
                autoComplete="username"
                error={values.errors["username"]?.length > 0}
                helperText={values.errors["username"]}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                margin="normal"
                id="email"
                label="E-Mail Adresse"
                name="email"
                autoComplete="email"
                error={values.errors["email"]?.length > 0}
                helperText={values.errors["email"]}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                margin="normal"
                name="password"
                label="Passwort"
                type="password"
                id="password"
                autoComplete="current-password"
                error={values.errors["password"]?.length > 0}
                helperText={values.errors["password"]}
                onChange={handleChange}
                required
                fullWidth
              />
              <Typography variant="caption" sx={{ p: 0 }}>
                Mind. 8 Zeichen
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                margin="normal"
                name="repeatPassword"
                label="Passwort wiederholen"
                type="password"
                id="repeatPassword"
                autoComplete="repeat-password"
                error={values.errors["repeatPassword"]?.length > 0}
                helperText={values.errors["repeatPassword"]}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          {values.errors.all?.length > 0 && (
            <Alert severity="error" variant="filled">
              {values.errors.all}
            </Alert>
          )}
          <Box sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Registrieren
            </Button>
          </Box>
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
    </Container>
  );
};

export default Register;
