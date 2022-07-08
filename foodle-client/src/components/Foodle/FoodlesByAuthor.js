import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FoodleCard from "../FoodleCard";
import { Masonry } from "@mui/lab";
import FoodleAPI from "../../utils/api";

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

  return (
    <Box>
      <Masonry columns={3} spacing={2}>
        {values.foodles.map((item, index) => (
          <FoodleCard key={index} foodle={item} />
        ))}
      </Masonry>
    </Box>
  );
};

export default FoodlesByAuthor;
