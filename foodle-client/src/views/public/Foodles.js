import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
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
import { useSearchParams } from "react-router-dom";

const Foodles = () => {
  const [values, setValues] = useState({
    loading: true,
    foodles: [],
    count: 0,
    page: 0,
    pages: 0,
    perPage: 10,
  });
  let [searchParams, setSearchParams] = useSearchParams();

  let query = searchParams.get("q") || "";

  const isLessThan1000 = useMediaQuery("(max-width: 1000px)");
  const isLessThan650 = useMediaQuery("(max-width: 650px)");

  const fetchFoodles = useCallback(() => {
    const api = new FoodleAPI();

    api
      .getFoodles({
        filter: {
          page: values.page,
          limit: values.perPage,
          text: query,
        },
      })
      .then((result) => {
        console.log(result);
        setValues((state) => ({ ...state, ...result.data }));
      })
      .catch((err) => console.error(err));
  }, [values.page, values.perPage, query]);

  useEffect(() => {
    fetchFoodles();
    return () => {};
  }, [fetchFoodles]);

  let countColumns = 4;
  if (isLessThan650) countColumns = 2;
  else if (isLessThan1000) countColumns = 3;
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" component="h1" sx={{ py: 2 }}>
        Foodles
      </Typography>
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

export default Foodles;
