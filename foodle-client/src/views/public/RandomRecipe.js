import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Typography, Fab } from "@mui/material";
import Loader from "../../components/Loader";
import FoodleAPI from "../../utils/api";

import CasinoIcon from "@mui/icons-material/Casino";
import RecipeCard from "../../components/RecipeCard";

const RandomRecipe = () => {
  const [values, setValues] = useState({
    loading: true,
    recipe: null,
  });

  const fetchRandomRecipe = useCallback(() => {
    const api = new FoodleAPI();

    api
      .getRandomFoodle()
      .then(({ data }) => {
        const recipe = {
          ...data,
          date: new Date(data.date).toLocaleDateString(),
        };
        setValues((state) => ({ ...state, loading: false, recipe }));
      })
      .catch((err) => {
        console.error(err);
        
      });
  }, []);

  useEffect(() => {
    fetchRandomRecipe();
    return () => {};
  }, [fetchRandomRecipe]);

  if (values.loading) return <Loader />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 2 }}>
        Zufälliges Rezept
      </Typography>
      <Typography variant="body1">
        Hier wird ein veröffentlichtes Rezept aus der großen Sammlung zufällig
        ausgewählt und angezeigt.
      </Typography>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <RecipeCard recipe={values.recipe} />
      </Box>

      <Fab
        variant="extended"
        onClick={() => {
          setValues({ ...values, loading: true });
          fetchRandomRecipe();
        }}
        color="secondary"
        aria-label="erneut würfeln"
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        <CasinoIcon sx={{ mr: 1 }} />
        Würfeln
      </Fab>
    </Container>
  );
};

export default RandomRecipe;
