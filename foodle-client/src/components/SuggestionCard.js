import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import FoodleAPI from "../utils/api";
import NoImage from "../assets/images/no-image.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routes";

const SuggestionCard = ({ category }) => {
  const [values, setValues] = useState({ loading: true, foodles: [] });

  const navigate = useNavigate();

  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getFoodlesByQuery({
        category: category,
        limit: 3,
      })
      .then((res) => {
        console.log(res);
        setValues((state) => ({
          ...state,
          foodles: res.data.foodles,
          loading: false,
        }));
      })
      .catch((err) => console.error(err));
    return () => {};
  }, [category]);

  return (
    <Card sx={{ maxWidth: 350, width: "100%" }}>
      <CardContent
        sx={{
          bgcolor: (theme) => theme.palette.secondary.dark,
          py: 0.5,
        }}
      >
        <Typography variant="subtitle1" component="div">
          {category}
        </Typography>
      </CardContent>

      {!values.loading ? (
        <>
          {values.foodles.map((foodle) => {
            const imageSrc =
              foodle.images?.length > 0 ? foodle.images[0].publicUrl : NoImage;
            return (
              <CardActionArea
                sx={{
                  bgcolor: (theme) => theme.palette.primary.main,
                  py: 0,
                }}
                onClick={() =>
                  navigate(
                    ROUTES.public.viewFoodle.path.replace(":id", foodle._id)
                  )
                }
                key={foodle._id}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={imageSrc}
                  alt="green iguana"
                  sx={{
                    objectFit: "crop",
                    background: (theme) => theme.palette.background.paper,
                  }}
                />
                <CardContent sx={{ py: 0 }}>
                  <Typography variant="h6" component="div">
                    {foodle.title?.length > 30
                      ? `${foodle.title.substring(0, 30)}...`
                      : foodle.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            );
          })}
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
};

export default SuggestionCard;
