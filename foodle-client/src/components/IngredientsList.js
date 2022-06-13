import React, { useState } from "react";
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
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { alpha } from "@mui/material/styles";
import { translate, CODES } from "../utils/translater";

const EnhancedTableToolbar = (props) => {
  const { numSelected, onSelectAllClick, rowCount } = props;
  const allSelected = rowCount > 0 && numSelected === rowCount;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {rowCount > 0 && (
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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} ausgewählt
        </Typography>
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
      {numSelected > 0 && (
        <Tooltip title="Zur Einkaufsliste hinzufügen">
          <IconButton>
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const IngredientsList = ({ data = [] }) => {
  const [values, setValues] = useState({
    ingredients: data,
    countPortions: 1,
  });

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.value === "none") {
      const newSelecteds = values.ingredients.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        onSelectAllClick={handleSelectAllClick}
        rowCount={values.ingredients.length}
      />
      <TableContainer>
        <Table aria-labelledby="tableTitle" size={"small"}>
          <TableBody>
            {values.ingredients.map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `table-${index}`;

              return (
                <TableRow
                  hover
                  onClick={() => handleClick(row.name)}
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
                    {translate(CODES.FOOD_UNITS, row.unit).abbr}
                  </TableCell>
                </TableRow>
              );
            })}
            {values.ingredients.length === 0 && (
              <TableRow sx={{ "td, th": { border: 0 } }}>
                <TableCell align="center" colSpan={3}>
                  Keine Zutaten
                </TableCell>
              </TableRow>
            )}
            {values.ingredients.length > 0 && (
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
      </TableContainer>
    </Paper>
  );
};

export default IngredientsList;
