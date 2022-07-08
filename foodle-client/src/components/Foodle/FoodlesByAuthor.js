import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import FoodleCard from "../FoodleCard";
import { Masonry } from "@mui/lab";
import FoodleAPI from "../../utils/api";
import Loader from "../../components/Loader";

const FoodlesByAuthor = ({ uid }) => {
  const [values, setValues] = useState({ loading: true, foodles: [] });

  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getMyFoodles({ filter: { author: uid } })
      .then((result) => {
        setValues((state) => ({ ...state, foodles: result.data || [] }));
      })
      .catch((err) => console.error(err));

    return () => {};
  }, [uid]);

  if (values.loading) <Loader />;

  return (
    <Box>
      {values.foodles.length > 0 ? (
        <Masonry columns={3} spacing={2}>
          {values.foodles.map((item, index) => (
            <FoodleCard key={index} foodle={item} />
          ))}
        </Masonry>
      ) : (
        <Typography variant="body1">Keine eigenen Foodles gefunden</Typography>
      )}
    </Box>
  );
};

export default FoodlesByAuthor;
