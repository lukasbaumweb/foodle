import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Container,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FoodleCard from "../../components/FoodleCard";
import { Masonry } from "@mui/lab";
import FoodleAPI from "../../utils/api";
import Empty from "../../assets/svg/empty.svg";
import { useCallback } from "react";
import { getLanguage } from "../../utils/translater";
import ClearIcon from "@mui/icons-material/Clear";

const categories = getLanguage()["categories"].map((cat) => ({
  name: cat,
  selected: false,
}));

const Categories = () => {
  const [values, setValues] = useState({
    loading: true,
    foodles: [],
    categories,
    count: 0,
    page: 0,
    pages: 0,
    perPage: 10,
  });

  const isLessThan1000 = useMediaQuery("(max-width: 1000px)");
  const isLessThan650 = useMediaQuery("(max-width: 650px)");

  const fetchFoodlesByCategories = useCallback(
    (categories) => {
      const api = new FoodleAPI();

      const filterCategories = categories
        .filter((cat) => cat.selected)
        .map((cat) => cat.name);

      const params = {
        filter: {
          page: values.page,
          limit: values.perPage,
        },
      };

      if (filterCategories.length > 0)
        params["filter"]["categories"] = filterCategories;

      api
        .getFoodles(params)
        .then((result) => {
          console.log(result);
          setValues((state) => ({ ...state, ...result.data, categories }));
        })
        .catch((err) => {
          setValues((state) => ({ ...state, categories }));
          console.error(err);
        });
    },
    [values.page, values.perPage]
  );

  useEffect(() => {
    fetchFoodlesByCategories(values.categories);
    return () => {};
  }, [fetchFoodlesByCategories, values.categories]);

  const handleClick = (category) => () => {
    const newCategories = values.categories.map((cat) => {
      if (cat.name === category) {
        return { ...cat, selected: !cat.selected };
      }
      return cat;
    });

    fetchFoodlesByCategories(newCategories);
  };

  let countColumns = 4;
  if (isLessThan650) countColumns = 2;
  else if (isLessThan1000) countColumns = 3;
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" component="h1" sx={{ pt: 2 }}>
        Kategorien
      </Typography>
      <Box sx={{ px: 2, pb: 2 }}>
        {values.categories
          .sort((a, b) => b.selected - a.selected)
          .map(({ name, selected }) => (
            <Chip
              key={name}
              label={name}
              variant={selected ? "standard" : "outlined"}
              onClick={handleClick(name)}
              onDelete={selected ? handleClick(name) : undefined}
              sx={{ ml: 1, mt: 1 }}
            />
          ))}
        {values.categories.some((cat) => cat.selected) ? (
          <Tooltip title="Filter löschen">
            <IconButton onClick={() => setValues({ ...values, categories })}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
      </Box>
      {values.foodles.length > 0 ? (
        <Masonry columns={countColumns} spacing={2}>
          {values.foodles.map((item, index) => (
            <FoodleCard key={index} foodle={item} />
          ))}
        </Masonry>
      ) : (
        <>
          <Box display="flex" marginTop={3} justifyContent="center">
            <img src={Empty} height="200" alt="Keine Fotos gefunden" />
          </Box>
          <Typography textAlign="center" variant="h5" sx={{ mt: 3 }}>
            Keine Foodles gefunden
          </Typography>
        </>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: "auto" }}
      >
        <Tooltip title="Foodles pro Seite" placement="left">
          <Select
            size="small"
            variant="standard"
            id="perPage"
            name="perPage"
            value={values.perPage}
            onChange={(e) => setValues({ ...values, perPage: e.target.value })}
          >
            {[5, 10, 25, 50, 100].map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>
        <Pagination
          count={values.pages}
          onChange={(_e, newValue) => setValues({ ...values, page: newValue })}
          sx={{ marginX: 2 }}
          showFirstButton
          showLastButton
        />
        <Typography variant="body2">
          {values.perPage <= values.count ? values.perPage : values.count} von{" "}
          {values.count} Foodles
        </Typography>
      </Box>
    </Container>
  );
};

export default Categories;
