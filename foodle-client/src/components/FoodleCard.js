import React from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import NoImage from "../assets/images/no-image.png";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useNavigate } from "react-router-dom";
import { onShare } from "../utils/functions";
import ROUTES from "../utils/routes";
import EditIcon from "@mui/icons-material/Edit";
import { Auth } from "../utils/auth";

const FoodleCard = ({ foodle = {}, imageSize = "auto" }) => {
  const isMobileDevice = useMediaQuery("(max-width: 650px)");

  const auth = new Auth();
  const theme = useTheme();

  const bgColor =
    theme.palette.mode === "dark" ? "#1e1e1e" : theme.palette.background.paper;

  const navigate = useNavigate();

  let imageSrc =
    foodle.images?.length > 0 ? foodle.images[0].publicUrl : NoImage;

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        sx={{
          p: 1,
          position: "relative",
          zIndex: 2,
          backgroundColor: bgColor,
        }}
        avatar={
          <Avatar sx={{ height: 30, width: 30 }}>
            {foodle.author?.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={foodle.author ? foodle.author.username : "Kein Autor vorhanden"}
        action={
          foodle.author?._id === auth.getUser()?.uid && (
            <Tooltip title="Bearbeiten">
              <IconButton
                site="small"
                onClick={() =>
                  navigate(
                    ROUTES.private.editFoodle.path.replace(":id", foodle._id)
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
        image={imageSrc}
        alt={"Foodle Bild nicht gefunden"}
        onError={(e) => {
          imageSrc = NoImage;
          e.target.src = NoImage;
        }}
        className="on-hover-grow"
        sx={{ position: "relative", zIndex: 1, maxHeight: "300px" }}
      />
      <CardContent
        sx={{
          pb: 0,
          position: "relative",
          zIndex: 2,
          backgroundColor: bgColor,
        }}
      >
        <Typography variant="h6">{foodle.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {foodle.body?.substring(0, 120)}
          {foodle.body?.length >= 120 && "..."}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Teilen">
          <IconButton
            aria-label="share"
            onClick={() =>
              onShare(
                `Schau dir mal dieses Foodle an 😋\n`,
                window.location.origin +
                  ROUTES.public.viewFoodle.path.replace(":id", foodle._id)
              )
            }
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Foodle anzeigen">
          {!isMobileDevice ? (
            <Button
              sx={{ ml: "auto" }}
              variant="contained"
              size="small"
              endIcon={<RestaurantMenuIcon />}
              onClick={() =>
                navigate(
                  ROUTES.public.viewFoodle.path.replace(":id", foodle._id)
                )
              }
              aria-label="Foodle anzeigen"
            >
              Kochen
            </Button>
          ) : (
            <IconButton
              sx={{ ml: "auto" }}
              size="small"
              aria-label="Foodle anzeigen"
              onClick={() =>
                navigate(
                  ROUTES.public.viewFoodle.path.replace(":id", foodle._id)
                )
              }
            >
              <RestaurantMenuIcon />
            </IconButton>
          )}
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default FoodleCard;
