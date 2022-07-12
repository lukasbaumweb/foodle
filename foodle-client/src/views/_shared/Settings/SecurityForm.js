import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";
import { Auth } from "../../../utils/auth";
import MessageBox from "../../../components/MessageBox";

const SecurityForm = () => {
  const [values, setValues] = useState({
    password: "",
    newPassword: "",
    errors: {},
    message: { text: "", type: "success" },
  });

  const validate = () => {
    const errors = {};

    if (values.password.length === 0) {
      errors["password"] = translate("validation-error/password-missing");
    } else if (values.password.length < 8) {
      errors["password"] = translate("validation-error/password-too-short");
    }

    if (values.newPassword.length === 0) {
      errors["newPassword"] = translate("validation-error/password-missing");
    } else if (values.newPassword.length < 8) {
      errors["newPassword"] = translate("validation-error/password-too-short");
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const auth = new Auth();
    const payload = {
      oldPassword: values.password,
      newPassword: values.newPassword,
    };

    auth
      .changePassword(payload)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          password: "",
          newPassword: "",
          errors: {},
          message: {
            text: "Gespeichert",
            type: "success",
          },
        });
      })
      .catch((err) => {
        console.error(err);
        setValues({
          ...values,
          message: {
            text: translate(err.message),
            type: "error",
          },
          errors: {},
        });
      });
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Passwort ändern
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="password"
            id="password"
            name="password"
            label="Aktuelles Passwort"
            variant="filled"
            autoComplete="current-password"
            value={values.email}
            onChange={handleChange}
            error={values.errors["password"]?.length > 0}
            helperText={values.errors["password"]}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            id="newPassword"
            name="newPassword"
            label="Neues Passwort"
            variant="filled"
            autoComplete="new-password"
            value={values.email}
            onChange={handleChange}
            error={values.errors["newPassword"]?.length > 0}
            helperText={values.errors["newPassword"]}
            fullWidth
            required
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button type="submit" variant="contained">
          Speichern
        </Button>
      </Box>

      {values.message.text.length > 0 && (
        <MessageBox
          message={values.message.text}
          type={values.message.type}
          dialogOpen={values.message.text.length > 0}
          onClose={() => setValues({ ...values, message: { text: "" } })}
        />
      )}
    </Box>
  );
};

export default SecurityForm;
