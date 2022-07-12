import React, { useEffect, useState } from "react";
import {
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
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { CODES, translate } from "../../utils/translater";
import { Entity, getLocalStorage } from "../../utils/functions";
import AddIcon from "@mui/icons-material/Add";
import AddIngredientDialog from "./AddIngredientDialog";
import FoodleAPI from "../../utils/api";

const EnhancedTableToolbar = (props) => {
  const { editable, onOpenDialog } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Zutaten
      </Typography>

      {editable && (
        <Tooltip title="Zutat hinzufügen">
          <IconButton onClick={onOpenDialog}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const IngredientsList = ({ data = [], foodleId, editable = false }) => {
  const [values, setValues] = useState({
    ingredients: data.filter((a) => a),
    selectableIngredients: [],
    countPortions: 1,
    open: false,
  });

  useEffect(() => {
    (async () => {
      const ingredients = await getLocalStorage(Entity.INGREDIENT);
      setValues((state) => ({
        ...state,
        selectableIngredients: Object.values(ingredients).map((item) => ({
          id: item._id,
          name: item.name,
        })),
      }));
    })();

    return () => {};
  }, []);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const removeIngredient = (index) => async () => {
    const ingredients = values.ingredients;

    const api = new FoodleAPI();

    if (ingredients[index]._id) {
      await api.removeIngredientFromFoodle(foodleId, ingredients[index]._id);
    }

    ingredients.splice(index, 1);

    setValues({
      ...values,
      ingredients,
    });
  };

  const addIngredient = async (item) => {
    const ingredients = values.ingredients;
    ingredients.push(item);

    const api = new FoodleAPI();

    await api.updateFoodle(foodleId, { ingredients: [item] });

    setValues({
      ...values,
      ingredients,
    });
  };

  return (
    <Box>
      <Paper sx={{ pb: 2 }}>
        <EnhancedTableToolbar
          editable={editable}
          onOpenDialog={() => setValues({ ...values, open: true })}
        />
        <TableContainer sx={{ width: "100%", display: "block" }}>
          <Table size={"small"}>
            <TableBody>
              {values.ingredients.map((row, index) => {
                const labelId = `table-${index}`;

                let amount = `${(row.amount * values.countPortions)
                  .toString()
                  .replace(".", ",")} ${
                  translate(CODES.FOOD_UNITS, row.unit)?.abbr
                }`;
                if (["pinch", "some"].indexOf(row.unit) > -1) {
                  amount = translate(CODES.FOOD_UNITS, row.unit)?.full;
                }

                return (
                  <TableRow
                    hover={editable}
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell align="right">{amount}</TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.config?.name || row.name || "Zutat unbekannt"}
                    </TableCell>
                    {editable && (
                      <TableCell align="right" sx={{ width: "auto" }}>
                        <IconButton
                          size="small"
                          onClick={removeIngredient(index)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              {values.ingredients.length === 0 && (
                <TableRow sx={{ "td, th": { border: 0 } }}>
                  <TableCell align="center" colSpan={3}>
                    <Typography variant="body2" color="#9e9e9e">
                      {editable
                        ? "Füge eine Zutat unten hinzu!"
                        : "Keine Zutaten"}
                    </Typography>
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
                        name="countPortions"
                        value={values.countPortions}
                        onChange={handleChange}
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
        </TableContainer>
      </Paper>

      {values.open && (
        <AddIngredientDialog
          selectableIngredients={values.selectableIngredients}
          open={values.open}
          onClose={() => setValues({ ...values, open: false })}
          onAdd={addIngredient}
        />
      )}
    </Box>
  );
};

export default IngredientsList;
