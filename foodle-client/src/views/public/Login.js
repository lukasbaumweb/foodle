import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Auth } from "../../utils/auth";
import ROUTES from "../../utils/routes";
import Loader from "../../components/Loader";
import { translate } from "../../utils/translater";
import { isObjectEmpty, validateEmail } from "../../utils/functions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SmallFoodBoy from "./../../assets/images/foodboy-small.png";
import { CONFIG } from "../../utils/config";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
    errors: {},
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    switch (params.get("e")) {
      case CONFIG.SESSION_EXPIRED_ABBR:
        setValues((state) => ({
          ...state,
          errors: { all: translate("auth-error/session-expired") },
          loading: false,
        }));
        break;

      default:
        break;
    }
    return () => {};
  }, []);

  const validate = () => {
    const errors = {};

    if (values.email.trim().length === 0) {
      errors["email"] = translate("validation-error/email-missing");
    } else if (!validateEmail(values.email.trim())) {
      errors["email"] = translate("validation-error/email-malformed");
    }

    if (values.password.trim().length === 0) {
      errors["password"] = translate("validation-error/password-missing");
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setValues({ ...values, loading: true });

    const auth = new Auth();
    auth
      .login(values.email.trim().toLowerCase(), values.password)
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.message);
        setValues({
          ...values,
          errors: { all: translate(err.message) },
          loading: false,
        });
      });
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          Foodle - Deine App für alle deine Rezepte
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate>
          <TextField
            variant="filled"
            margin="normal"
            id="email"
            label="E-Mail Adresse"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={values.email}
            error={values.errors["email"]?.length > 0}
            helperText={values.errors["email"]}
            required
            fullWidth
          />

          <FormControl variant="filled" sx={{ my: 3 }} fullWidth required>
            <InputLabel htmlFor="password">Passwort</InputLabel>
            <FilledInput
              id="password"
              name="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={values.errors["password"]?.length > 0}>
              {values.errors["password"]}
            </FormHelperText>
          </FormControl>

          {values.errors.all && (
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
              Anmelden
            </Button>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs>
            <Link to={ROUTES.public.resetPassword.path} variant="body2">
              Passwort vergessen?
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

export default Login;
