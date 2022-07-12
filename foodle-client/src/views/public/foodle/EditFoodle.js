import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import FoodleAPI from "../../../utils/api";
import Loader from "../../../components/Loader";
import { getLanguage, translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";
import IngredientsList from "../../../components/IngredientsList";
import TutorialList from "../../../components/TutorialList/index";
import { useNavigate, useParams } from "react-router-dom";
import SelectTags from "../../../components/SelectTags";
import UploadImage from "../../../components/UploadImage";
import SwitchPublishStatus from "../../../components/SwitchPublishStatus";
import DeleteFoodleButton from "../../../components/DeleteFoodleButton";
import ROUTES from "../../../utils/routes";
import PageviewIcon from "@mui/icons-material/Pageview";

const EditFoodle = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    steps: [],
    startPortion: 1,
    cookingTime: 0,
    workTime: 0,
    totalTime: 0,
    calories: 0,
    ingredients: [],
    isPrivate: true,
    errors: {},
    exists: false,
    loading: true,
    isDirty: false,
    openConfirmDialog: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getFoodle(id)
      .then(({ data }) => {
        setValues((state) => ({
          ...state,
          ingredients: data?.ingredients,
          steps: data?.steps,
          startState: { ...data },
          ...data,
          exists: !!data,
          loading: false,
        }));
      })
      .catch((err) => console.error(err));

    const beforeUnloadCallback = (event) => {
      if (values.isDirty) {
        event.returnValue = false;
      } else {
        return false;
      }
    };

    window.addEventListener("beforeunload", beforeUnloadCallback);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadCallback);
    };
  }, [id, values.isDirty]);

  if (values.loading) return <Loader />;

  const validate = () => {
    const errors = {};

    if (values.title.trim().length === 0) {
      errors["title"] = translate("validation-error/title-missing");
    }

    if (values.startPortion < 1) {
      errors["startPortion"] = translate("validation-error/start-too-low");
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value, isDirty: true });

  const onSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validate()) return;

    setValues({ ...values, loading: true });

    const payload = {
      title: values.title,
      description: values.description,
      category: values.category,
      tags: values.tags.filter((t) => t).map((tag) => tag.name),
      cookingTime: values.cookingTime || 0,
      workTime: values.workTime || 0,
      totalTime: values.totalTime || 0,
      calories: values.calories || 0,
      startPortion: values.startPortion || 1,
    };
    const api = new FoodleAPI();

    api
      .updateFoodle(id, payload)
      .then(() => setValues({ ...values, loading: false, isDirty: false }))
      .catch((err) => {
        console.error(err);
        setValues({ ...values, loading: false, errors: {} });
      });

    try {
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      setValues({ ...values, error: { type: "error", message } });
    }
  };

  if (!values.exists)
    return (
      <Container sx={{ pt: 3 }}>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1 }}>
              404 - Foodle nicht gefunden
            </Typography>
            <Typography variant="body1">
              Das Foodle mit der ID: "{id}" konnte nicht gefunden werden
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );

  return (
    <Container sx={{ pt: 1 }}>
      <Grid container spacing={3} component="form" onSubmit={onSubmit}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Tooltip title="Foodle anschauen">
                  <IconButton
                    onClick={() =>
                      navigate(ROUTES.public.viewFoodle.path.replace(":id", id))
                    }
                  >
                    <PageviewIcon />
                  </IconButton>
                </Tooltip>
                <SwitchPublishStatus isPrivate={values.isPrivate} id={id} />
                <DeleteFoodleButton id={id} sx={{ ml: 2 }} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <UploadImage id={id} />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Titel des Foodles"
                variant="filled"
                onChange={handleChange}
                value={values.title}
                helperText="z.B. Spaghetti Carbonara"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Kurzbeschreibung"
                variant="filled"
                onChange={handleChange}
                value={values.description}
                multiline
                rows={3}
                helperText="z.B. Mega leckere Spaghetti Variante nach Sheldon Cooper"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="category">Kategorie</InputLabel>
                <Select
                  name="category"
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                  required
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Kategorie auswählen
                  </MenuItem>

                  {getLanguage()["categories"].map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="startPortion"
                label="Startportion"
                variant="filled"
                onChange={handleChange}
                value={values.startPortion}
                type="number"
                helperText={
                  values.errors["startPortion"]?.length > 0
                    ? values.errors["startPortion"]
                    : "Portion, welche standardmäßig vorgeschlagen wird"
                }
                error={values.errors["startPortion"]?.length > 0}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} xl={4}>
          <IngredientsList foodleId={id} data={values.ingredients} editable />
        </Grid>
        <Grid item xs={12} md={6}>
          <TutorialList foodleId={id} data={values.steps} editable />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                name="cookingTime"
                label="Zeitaufwand"
                variant="filled"
                onChange={handleChange}
                value={values.cookingTime}
                helperText="Minuten"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="workTime"
                label="Arbeitsaufwand"
                variant="filled"
                onChange={handleChange}
                value={values.workTime}
                helperText="Minuten"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="totalTime"
                label="Gesamter Aufwand"
                variant="filled"
                onChange={handleChange}
                value={values.totalTime}
                helperText="Minuten"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="calories"
                label="Kalorien"
                variant="filled"
                onChange={handleChange}
                value={values.calories}
                helperText="kcal"
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SelectTags
            value={values.tags}
            onChangeTags={(tags) => setValues({ ...values, tags })}
          />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="flex-end"
          sx={{ mt: 1 }}
        >
          <Button type="submit" variant="contained">
            Speichern
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditFoodle;
