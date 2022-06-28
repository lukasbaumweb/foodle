import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Chef from "../assets/svg/chef.svg";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useNavigate } from "react-router-dom";
import { onShare } from "../utils/functions";
import ROUTES from "../utils/routes";

const RecipeCard = ({ recipe = {} }) => {
  const [values, setValues] = useState({ isFavorite: false });

  const addToFavorites = () => {
    setValues({ ...values, isFavorite: !values.isFavorite });
  };

  const navigate = useNavigate();

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar>{recipe.author.username.charAt(0).toUpperCase()}</Avatar>
        }
        title={recipe.author ? recipe.author?.username : "Kein Autor vorhanden"}
        subheader={recipe.date || ""}
      />
      <CardMedia
        component="img"
        height="250"
        image={recipe.img || Chef}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="h5">{recipe.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.body?.substring(0, 120)}
          {recipe.body?.length >= 120 && "..."}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Zu Favoriten hinzufügen"
          onClick={addToFavorites}
        >
          {values.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() =>
            onShare(
              document,
              navigator,
              `Schau dir mal dieses Rezept an 😋\n`,
              window.location.origin +
                ROUTES.public.recipe.path.replace(":id", recipe._id)
            )
          }
        >
          <ShareIcon />
        </IconButton>
        <Button
          sx={{ ml: "auto" }}
          variant="contained"
          endIcon={<RestaurantMenuIcon />}
          onClick={() =>
            navigate(ROUTES.public.recipe.path.replace(":id", recipe._id))
          }
          aria-label="Rezept anzeigen"
        >
          Kochen
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
