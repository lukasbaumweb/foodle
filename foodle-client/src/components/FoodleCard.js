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
  Tooltip,
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
import EditIcon from "@mui/icons-material/Edit";
import { Auth } from "../utils/auth";

const FoodleCard = ({ recipe = {}, imageSize = 100 }) => {
  const [values, setValues] = useState({ isFavorite: false });

  const auth = new Auth();

  const addToFavorites = () => {
    setValues({ ...values, isFavorite: !values.isFavorite });
  };

  const navigate = useNavigate();

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        sx={{ p: 1 }}
        avatar={
          <Avatar sx={{ height: 30, width: 30 }}>
            {recipe.author?.firstName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          recipe.author
            ? `${recipe.author?.firstName} ${recipe.author?.lastName}`
            : "Kein Autor vorhanden"
        }
        action={
          recipe.author?._id === auth.getUser().uid && (
            <Tooltip title="Bearbeiten">
              <IconButton
                site="small"
                onClick={() =>
                  navigate(
                    ROUTES.public.editRecipe.path.replace(":id", recipe._id)
                  )
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <CardMedia
        component="img"
        height={imageSize}
        image={recipe.img || Chef}
        alt={recipe.title}
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6">{recipe.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.body?.substring(0, 120)}
          {recipe.body?.length >= 120 && "..."}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Favorit">
          <IconButton
            aria-label="Zu Favoriten hinzufügen"
            onClick={addToFavorites}
          >
            {values.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Teilen">
          <IconButton
            aria-label="share"
            onClick={() =>
              onShare(
                document,
                navigator,
                `Schau dir mal dieses Foodle an 😋\n`,
                window.location.origin +
                  ROUTES.public.recipe.path.replace(":id", recipe._id)
              )
            }
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Foodle anzeigen">
          <Button
            sx={{ ml: "auto" }}
            variant="contained"
            size="small"
            endIcon={<RestaurantMenuIcon />}
            onClick={() =>
              navigate(ROUTES.public.recipe.path.replace(":id", recipe._id))
            }
            aria-label="Foodle anzeigen"
          >
            Kochen
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default FoodleCard;
