import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import RecipeCard from "./../RecipeCard";
import { Masonry } from "@mui/lab";
import FoodleAPI from "../../utils/api";

const MyRecipes = ({ uid }) => {
  const [values, setValues] = useState({ loading: true, recipes: [] });

  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getFoodles({ filter: { author: uid } })
      .then((result) => {
        setValues((state) => ({ ...state, recipes: result.data || [] }));
      })
      .catch((err) => console.error(err));

    return () => {};
  }, []);

  return (
    <Box>
      <Masonry columns={3} spacing={2}>
        {values.recipes.map((item, index) => (
          <RecipeCard key={index} recipe={item} />
        ))}
      </Masonry>
    </Box>
  );
};

export default MyRecipes;
