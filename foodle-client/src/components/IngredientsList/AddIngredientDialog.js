import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { getLanguage } from "../../utils/translater";
import { isObjectEmpty } from "../../utils/functions";
import VirtualizezSelectBox from "../VirtualSelectBox";

const FOOD_UNITS = Object.entries(getLanguage().foodUnits).map((val) => ({
  id: val[0],
  label: `${val[1].full} (${val[1].abbr})`,
}));

const AddIngredient = ({ selectableIngredients, onAdd, open, onClose }) => {
  const [values, setValues] = useState({
    name: null,
    unit: null,
    amount: 0,
    amountIsRequired: true,
    open: open,
    errors: {},
  });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const validateIngredient = () => {
    const errors = {};

    if (!values.name || !values.name.id) {
      errors["name"] = "Name erforderlich";
    }

    if (!values.unit || !values.unit.id) {
      errors["unit"] = "Einheit erforderlich";
    }

    if (values.amountIsRequired) {
      if (String(values.amount).trim().length === 0) {
        errors["amount"] = "Menge erforderlich";
      }

      if (values.amount === 0) {
        errors["amount"] = "Menge darf nicht 0 sein";
      }
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const addIngredient = () => {
    if (!validateIngredient()) return;
    const newIngredient = {
      config: values.name.id,
      name: values.name.name,
      amount: values.amount,
      unit: values.unit.id,
    };

    setValues({
      ...values,
      name: null,
      unit: null,
      amount: 0,
      errors: {},
    });
    onAdd(newIngredient);
  };

  return (
    <Dialog
      open={values.open}
      onClose={onClose}
      maxWidth="sm"
      scroll="body"
      fullWidth
      noValidate
    >
      <DialogTitle>Zutat hinzufügen</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} paddingTop={1}>
          <Grid item xs={12}>
            <VirtualizezSelectBox
              options={selectableIngredients}
              label="Zutat"
              error={values.errors["name"]?.length > 0}
              helperText={values.errors["name"]}
              name="name"
              value={values.name}
              onChange={(_event, newValue) => {
                setValues({ ...values, name: newValue });
              }}
              disablePortal={false}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Menge"
              type="number"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              error={values.errors["amount"]?.length > 0}
              helperText={values.errors["amount"]}
              required={values.amountIsRequired}
              disabled={!values.amountIsRequired}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={FOOD_UNITS}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Einheit"
                  error={values.errors["unit"]?.length > 0}
                  helperText={values.errors["unit"]}
                />
              )}
              name="unit"
              value={values.unit}
              onChange={(_event, newValue) => {
                let amountIsRequired = true;
                if (["pinch", "some"].indexOf(newValue.id) > -1) {
                  amountIsRequired = false;
                }

                setValues({ ...values, unit: newValue, amountIsRequired });
              }}
              disablePortal={false}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose}>Schließen</Button>
        <Button variant="contained" onClick={addIngredient}>
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddIngredient;
