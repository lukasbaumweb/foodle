import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Fab,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import Loader from "../../components/Loader";
import FoodleAPI from "../../utils/api";

import CasinoIcon from "@mui/icons-material/Casino";
import RecipeCard from "../../components/RecipeCard";
import ROUTES from "../../utils/routes";
import { Link as RouterLink } from "react-router-dom";

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
        if (!data) setValues((state) => ({ ...state, loading: false }));
        else {
          const recipe = {
            ...data,
            date: new Date(data.date).toLocaleDateString(),
          };
          setValues((state) => ({ ...state, loading: false, recipe }));
        }
      })
      .catch((err) => {
        console.error(err);
        setValues((state) => ({ ...state, loading: false }));
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
        {values.recipe ? (
          <RecipeCard recipe={values.recipe} />
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h5">
                Es ist ein Fehler aufgetreten
              </Typography>
              <Typography variant="body1">
                Versuche es{" "}
                <Link
                  component="button"
                  onClick={() => {
                    setValues({ ...values, loading: true });
                    fetchRandomRecipe();
                  }}
                  variant="body2"
                >
                  nochmal
                </Link>{" "}
                oder versuche es später erneut. Falls das Problem immer noch
                bestehen sollte, dann kontaktiere bitte den{" "}
                <RouterLink to={ROUTES.public.about.path}>Support</RouterLink>.
              </Typography>
            </CardContent>
          </Card>
        )}
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
