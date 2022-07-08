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
import FoodleCard from "../../components/FoodleCard";
import ROUTES from "../../utils/routes";
import { Link as RouterLink } from "react-router-dom";

const RandomFoodle = () => {
  const [values, setValues] = useState({
    loading: true,
    foodle: null,
  });

  const fetchRandomFoodle = useCallback(() => {
    const api = new FoodleAPI();

    api
      .getRandomFoodle()
      .then(({ data }) => {
        if (!data) setValues((state) => ({ ...state, loading: false }));
        else {
          const foodle = {
            ...data,
            date: new Date(data.date).toLocaleDateString(),
          };
          setValues((state) => ({ ...state, loading: false, foodle }));
        }
      })
      .catch((err) => {
        console.error(err);
        setValues((state) => ({
          ...state,
          error: err.message,
          loading: false,
        }));
      });
  }, []);

  useEffect(() => {
    fetchRandomFoodle();
    return () => {};
  }, [fetchRandomFoodle]);

  if (values.loading) return <Loader />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 2 }}>
        Zufälliges Foodle
      </Typography>
      <Typography variant="body1">
        Hier wird ein veröffentlichtes Foodle aus der großen Sammlung zufällig
        ausgewählt und angezeigt.
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        marginTop="20px"
      >
        {values.foodle ? (
          <FoodleCard foodle={values.foodle} imageSize="300" />
        ) : (
          <Card sx={{ marginY: 2 }}>
            <CardContent>
              <Typography variant="h5">
                Kein zufälliges Foodle gefunden
              </Typography>
              <Typography variant="body1">
                Es konnte kein öffentlich bereitgestelltes Foodle gefunden
                werden{" "}
              </Typography>
            </CardContent>
          </Card>
        )}
        {values.error && (
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
                    fetchRandomFoodle();
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
        <Fab
          variant="extended"
          onClick={() => {
            setValues({ ...values, loading: true });
            fetchRandomFoodle();
          }}
          color="secondary"
          aria-label="erneut würfeln"
          sx={{ mt: 1, width: "auto" }}
        >
          <CasinoIcon sx={{ mr: 1 }} />
          Würfeln
        </Fab>
      </Box>
    </Container>
  );
};

export default RandomFoodle;
