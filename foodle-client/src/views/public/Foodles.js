import React, { useState, useEffect } from "react";
import { Box, Pagination, Typography, useMediaQuery } from "@mui/material";
import FoodleCard from "../../components/FoodleCard";
import { Masonry } from "@mui/lab";
import FoodleAPI from "../../utils/api";
import Empty from "../../assets/svg/empty.svg";
import FoodleDial from "../../components/FoodleDial";

const Foodles = ({ uid }) => {
  const [values, setValues] = useState({
    loading: true,
    foodles: [],
    page: 0,
    pages: 0,
  });

  const isLessThan1000 = useMediaQuery("(max-width: 1000px)");
  const isLessThan750 = useMediaQuery("(max-width: 750px)");
  const isLessThan550 = useMediaQuery("(max-width: 550px)");

  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getFoodles({})
      .then((result) => {
        console.log(result);
        setValues((state) => ({ ...state, ...result.data }));
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
      Foodles
      {values.foodles.length > 0 ? (
        <>
          <Masonry columns={countColumns} spacing={2}>
            {values.foodles.map((item, index) => (
              <FoodleCard key={index} foodle={item} />
            ))}
          </Masonry>
          <Box display="flex" justifyContent="center">
            <Pagination count={values.pages} showFirstButton showLastButton />
          </Box>
        </>
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
      <FoodleDial />
    </Box>
  );
};

export default Foodles;
