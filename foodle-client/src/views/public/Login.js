import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../utils/auth";
import ROUTES from "../../utils/routes";
import Loader from "../../components/Loader";
import { translate } from "../../utils/translater";
import { isObjectEmpty } from "../../utils/functions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SmallLogo from "./../../assets/images/foodles-small.png";
import constants from "../../utils/constants";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
    loading: false,
    errors: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    switch (params.get("e")) {
      case constants.SESSION_EXPIRED_ABBR:
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

    if (values.username.trim().length === 0) {
      errors["username"] = translate("validation-error/username-missing");
    }

    if (values.password.trim().length === 0) {
      errors["password"] = translate("validation-error/password-missing");
    }
    const result = isObjectEmpty(errors);
    if (result) setValues({ ...values, errors: errors });

    return result;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setValues({ ...values, loading: true });

    const auth = new Auth();
    auth.login(values.username, values.password, (err, data) => {
      if (err) {
        setValues({
          ...values,
          errors: { all: err.error },
          loading: false,
        });
      } else {
        window.location.href = "/";
        // navigate(ROUTES.private.home.path);
      }
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
        <img src={SmallLogo} alt="Foodle Logo" />

        <Typography variant="body1" sx={{ mt: 2 }}>
          Foodle - Deine App für alle deine Rezepte
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Benutzername"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
            value={values.username}
            error={values.errors["username"]?.length > 0}
            helperText={values.errors["username"]}
          />

          <FormControl variant="filled" fullWidth>
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
          </FormControl>

          {values.errors.all && (
            <Alert severity="error">{values.errors.all}</Alert>
          )}
          <Box sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Anmelden
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link to={ROUTES.public.resetPassword.path} variant="body2">
                Passwort vergessen?
              </Link>
            </Grid>
            <Grid item>
              <Link to={ROUTES.public.register.path} variant="body2">
                Noch kein Account?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
