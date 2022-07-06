import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import RecipeCard from "./../../components/RecipeCard";
import { Masonry } from "@mui/lab";
import FoodleAPI from "../../utils/api";
import Empty from "../../assets/svg/empty.svg";
import RecipeDial from "../../components/RecipeDial";

const Recipes = ({ uid }) => {
  const [values, setValues] = useState({ loading: true, recipes: [] });

  const isLessThan1000 = useMediaQuery("(max-width: 1000px)");
  const isLessThan750 = useMediaQuery("(max-width: 750px)");
  const isLessThan550 = useMediaQuery("(max-width: 550px)");

  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getFoodles({})
      .then((result) => {
        console.log(result);
        setValues((state) => ({ ...state, recipes: result.data || [] }));
      })
      .catch((err) => console.error(err));

    return () => {};
  }, []);

  let countColumns = 4;
  if (isLessThan550) countColumns = 1;
  else if (isLessThan750) countColumns = 2;
  else if (isLessThan1000) countColumns = 3;
  return (
    <Box>
      {values.recipes.length > 0 ? (
        <Masonry columns={countColumns} spacing={2}>
          {values.recipes.map((item, index) => (
            <RecipeCard key={index} recipe={item} />
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

      <RecipeDial />
    </Box>
  );
};

export default Recipes;
