import React, { useState, useEffect } from "react";
import {
  Chip,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import FoodleAPI from "../../../utils/api";
import NoImage from "../../../assets/images/no-image.png";
import IngredientsList from "../../../components/IngredientsList";
import Loader from "../../../components/Loader";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallMadeIcon from "@mui/icons-material/CallMade";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TimerIcon from "@mui/icons-material/Timer";
import TutorialList from "../../../components/TutorialList";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { Auth } from "../../../utils/auth";
import ROUTES from "../../../utils/routes";
import { onShare } from "../../../utils/functions";
import ImageModal from "../../../components/ImageModal";
import SuggestionCard from "../../../components/SuggestionCard";

const MAIN_CATEGORIES = ["Vorspeise", "Hauptgericht", "Nachspeise"];

const Foodle = () => {
  const [values, setValues] = useState({
    foodle: {},
    categories: [],
    errors: {},
    loading: true,
  });
  const auth = new Auth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const api = new FoodleAPI();

      api
        .getPublicFoodle(id)
        .then(({ data }) => {
          setValues((state) => ({
            ...state,
            foodle: data,
            exists: !!data,
            loading: false,
          }));
        })
        .catch((err) => {
          console.error(err);
          setValues((state) => ({ ...state, loading: false }));
        });
    })();

    return () => {};
  }, [id]);

  if (values.loading) return <Loader />;

  const imageSrc =
    values.foodle.images?.length > 0
      ? values.foodle.images[0].publicUrl
      : NoImage;

  const possibleCombination = MAIN_CATEGORIES.filter(
    (c) => values.foodle.category !== c
  );
  console.log(possibleCombination);

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ mt: 1 }} spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ height: 30, width: 30, mr: 1 }}>
              {values.foodle.author?.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6">
              {values.foodle.author.username}
            </Typography>
          </Box>
          <Button
            onClick={() =>
              onShare(
                `Schau dir mal dieses Foodle an 😋\n`,
                ROUTES.public.viewFoodle.path.replace(":id", id)
              )
            }
            startIcon={<ShareIcon />}
          >
            Teilen
          </Button>
          {auth.getUser()?.uid === values.foodle.author?._id && (
            <Button
              onClick={() =>
                navigate(ROUTES.private.editFoodle.path.replace(":id", id))
              }
              startIcon={<EditIcon />}
            >
              Bearbeiten
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <ImageModal imageSrc={imageSrc} alt={values.foodle.title} />
          <Typography variant="h4" sx={{ mt: 1 }}>
            {values.foodle.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Kategorie: {values.foodle.category}
            <br />
            {values.foodle.description}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Tooltip title="Zeitaufwand">
              <Chip
                icon={<AccessTimeIcon />}
                label={values.foodle.cookingTime || "Unbekannt"}
                variant="outlined"
                size="small"
                onClick={() => {}}
              />
            </Tooltip>
            <Tooltip title="Arbeitsaufwand">
              <Chip
                icon={<TimelapseIcon />}
                label={values.foodle.workTime || "Unbekannt"}
                variant="outlined"
                size="small"
                onClick={() => {}}
              />
            </Tooltip>
            <Tooltip title="Gesamter Aufwand">
              <Chip
                icon={<TimerIcon />}
                label={values.foodle.totalTime || "Unbekannt"}
                variant="outlined"
                size="small"
                onClick={() => {}}
              />
            </Tooltip>
            <Tooltip title="Kalorien (kcal)">
              <Chip
                icon={<CallMadeIcon />}
                label={values.foodle.calories || "Unbekannt"}
                variant="outlined"
                size="small"
                onClick={() => {}}
              />
            </Tooltip>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <IngredientsList
            data={values.foodle.ingredients}
            startPortion={values.foodle.startPortion}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <TutorialList data={values.foodle.steps} />
        </Grid>
        <Grid item xs={12}>
          {values.foodle.tags.map((tag, index) => (
            <Chip
              label={tag}
              variant="outlined"
              sx={{ mt: 1, mr: 1 }}
              key={index}
            />
          ))}
        </Grid>
        <Grid item xs={12} md={12} xl={4}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <SuggestionCard category={possibleCombination[0]} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SuggestionCard category={possibleCombination[1]} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Foodle;
