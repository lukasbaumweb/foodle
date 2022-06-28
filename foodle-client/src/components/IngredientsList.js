import React, { useEffect, useState } from "react";
import {
  ToggleButton,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  InputAdornment,
  FilledInput,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  Grid,
  Button,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { translate, CODES, getLanguage } from "../utils/translater";
import { getAllIngredients, isObjectEmpty } from "../utils/functions";

const FOOD_UNITS = Object.entries(getLanguage().foodUnits).map((val) => ({
  id: val[0],
  label: `${val[1].full} (${val[1].abbr})`,
}));

const EnhancedTableToolbar = (props) => {
  const { numSelected, onSelectAllClick, rowCount, editable } = props;
  const allSelected = rowCount > 0 && numSelected === rowCount;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {rowCount > 0 && !editable && (
        <ToggleButton
          variant="outlined"
          onClick={onSelectAllClick}
          sx={{ mr: 2 }}
          value={allSelected ? "all" : "none"}
          selected={allSelected}
        >
          {allSelected ? "Keine" : "Alle"}
        </ToggleButton>
      )}
      {numSelected > 0 && !editable ? (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} ausgewählt
          </Typography>
          <Tooltip title="Zur Einkaufsliste hinzufügen">
            <IconButton>
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Zutaten
        </Typography>
      )}
    </Toolbar>
  );
};

const IngredientsList = ({ data = [], editable = false }) => {
  const [values, setValues] = useState({
    ingredients: data,
    selectableIngredients: [],
    countPortions: 1,
    name: null,
    amount: 0,
    unit: null,
    errors: {},
  });

  useEffect(() => {
    (async () => {
      const ingredients = await getAllIngredients(window);
      setValues((state) => ({
        ...state,
        selectableIngredients: ingredients.map((item) => ({
          id: item.name,
          label: translate(CODES.INGREDIENT_NAME, item.name),
        })),
      }));
    })();

    return () => {};
  }, []);

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.value === "none") {
      const newSelecteds = values.ingredients.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const validateIngredient = () => {
    const errors = {};

    if (!values.name || !values.name.id) {
      errors["name"] = "Name erforderlich";
    }
    if (!values.unit || !values.unit.id) {
      errors["unit"] = "Einheit erforderlich";
    }
    if (String(values.amount).trim().length === 0) {
      errors["amount"] = "Menge erforderlich";
    }

    if (values.amount === 0) {
      errors["amount"] = "Menge darf nicht 0 sein";
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const addIngredient = () => {
    if (!validateIngredient()) return;

    const ingredients = values.ingredients;
    ingredients.push({
      name: values.name.id,
      amount: values.amount,
      unit: values.unit.id,
    });
    setValues({
      ...values,
      ingredients,
      name: null,
      amount: 0,
      unit: null,
      errors: {},
    });
  };

  const removeIngredient = (index) => () => {
    const ingredients = values.ingredients;
    ingredients.splice(index, 1);

    setValues({
      ...values,
      ingredients,
    });
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        onSelectAllClick={handleSelectAllClick}
        rowCount={values.ingredients.length}
        editable={editable}
      />
      <TableContainer>
        <Table aria-labelledby="tableTitle" size={"small"}>
          <TableBody>
            {values.ingredients.map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `table-${index}`;

              console.log(row);
              return (
                <TableRow
                  hover={!editable}
                  onClick={editable ? undefined : () => handleClick(row.name)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={index}
                  selected={isItemSelected}
                  sx={{
                    bgcolor: (theme) =>
                      index % 2 === 0
                        ? alpha(
                            theme.palette.secondary.main,
                            theme.palette.action.activatedOpacity
                          )
                        : "",
                  }}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    {translate(CODES.INGREDIENT_NAME, row.name)}
                  </TableCell>
                  <TableCell align="right">
                    {row.amount * values.countPortions}{" "}
                    {translate(CODES.FOOD_UNITS, row.unit)?.abbr}
                  </TableCell>
                  <TableCell align="right" sx={{ width: "auto" }}>
                    <IconButton size="small" onClick={removeIngredient(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {values.ingredients.length === 0 && (
              <TableRow sx={{ "td, th": { border: 0 } }}>
                <TableCell align="center" colSpan={3}>
                  {editable ? "Füge eine Zutat hinzu" : "Keine Zutaten"}
                </TableCell>
              </TableRow>
            )}
            {values.ingredients.length > 0 && !editable && (
              <TableRow sx={{ "td, th": { border: 0 } }}>
                <TableCell align="center" colSpan={3}>
                  <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="portion-input">
                      Anzahl Portionen
                    </InputLabel>
                    <FilledInput
                      id="portion-input"
                      type="number"
                      value={values.countPortions}
                      onChange={(e) =>
                        setValues({ ...values, countPortions: e.target.value })
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          Portionen
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {editable && (
          <Grid container spacing={2} padding={1}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                size="small"
                disablePortal
                options={values.selectableIngredients}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Zutat"
                    error={values.errors["name"]?.length > 0}
                    helperText={values.errors["name"]}
                  />
                )}
                name="name"
                value={values.name}
                onChange={(event, newValue) => {
                  setValues({ ...values, name: newValue });
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                label="Menge"
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                error={values.errors["amount"]?.length > 0}
                helperText={values.errors["amount"]}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                size="small"
                disablePortal
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
                onChange={(event, newValue) => {
                  setValues({ ...values, unit: newValue });
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                onClick={addIngredient}
                size="small"
                startIcon={<AddIcon />}
              >
                Hinzufügen
              </Button>
            </Grid>
          </Grid>
        )}
      </TableContainer>
    </Paper>
  );
};

export default IngredientsList;
