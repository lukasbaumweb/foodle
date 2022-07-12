import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import FoodleCard from "../FoodleCard";
import { Masonry } from "@mui/lab";
import FoodleAPI from "../../utils/api";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";

const FoodlesByAuthor = ({ uid }) => {
  const [values, setValues] = useState({ loading: true, foodles: [] });

  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getMyFoodles({ filter: { author: uid } })
      .then((result) => {
        setValues((state) => ({
          ...state,
          foodles: result.data || [],
          loading: false,
        }));
      })
      .catch((err) => {
        console.error(err);
        setValues((state) => ({
          ...state,
          foodles: [],
          loading: false,
        }));
      });

    return () => {};
  }, [uid]);

  if (values.loading) return <Loader />;

  return (
    <Box>
      {values.foodles.length > 0 ? (
        <Masonry columns={3} spacing={2}>
          {values.foodles.map((item, index) => (
            <FoodleCard key={index} foodle={item} />
          ))}
        </Masonry>
      ) : (
        <Box textAlign="center">
          <Typography variant="h6" textAlign="center">
            Keine eigenen Foodles gefunden.
          </Typography>{" "}
          <Link to={ROUTES.private.createFoodle.path}>Foodle Erstellen</Link>
        </Box>
      )}
    </Box>
  );
};

export default FoodlesByAuthor;
