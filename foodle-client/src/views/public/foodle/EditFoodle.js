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
} from "@mui/material";
import FoodleAPI from "../../../utils/api";
import Loader from "../../../components/Loader";
import { getLanguage, translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";
import ImageSlider from "../../../components/Images/ImageSlieder";
import UploadImageButton from "../../../components/Images/UploadImageButton";
import EditImagesButton from "../../../components/Images/EditImagesButton";
import IngredientsList from "../../../components/IngredientsList";
import TutorialList from "../../../components/TutorialList/index";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../../utils/routes";
import SelectTags from "../../../components/SelectTags";
import DetailsMenu from "../../../components/DetailsMenu";
import { capitalize } from "../../../utils/functions";

const EditFoodle = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    category: "",
    isPrivate: true,
    tags: [],
    ingredients: [],
    steps: [],
    error: {},
    exists: false,
    loading: true,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getFoodle(id)
      .then(({ data }) => {
        setValues((state) => ({
          ...state,
          ingredients: data?.ingredients,
          steps: data?.steps,
          ...data,
          exists: !!data,
          loading: false,
        }));
      })
      .catch((err) => console.error(err));

    return () => {};
  }, [id]);

  if (values.loading) return <Loader />;

  const validate = () => {
    const errors = {};

    if (values.title.trim().length === 0) {
      errors["title"] = translate("validation-error/title-missing");
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setValues({ ...values, loading: true });

    const payload = {
      title: values.title,
      description: values.description,
      category: values.category,
      tags: values.tags.filter((t) => t).map((tag) => tag.name),
    };
    const api = new FoodleAPI();

    api
      .updateFoodle(id, payload)
      .then(() => setValues({ ...values, loading: false }))
      .catch((err) => {
        console.error(err);
        setValues({ ...values, loading: false });
      });

    try {
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      setValues({ ...values, error: { type: "error", message } });
    }
  };

  const deleteFoodle = async () => {
    const api = new FoodleAPI();
    try {
      await api.deleteFoodle(id);
      navigate(ROUTES.public.foodles.path);
    } catch (err) {
      console.error(err);
      setValues({ ...values });
    }
  };

  const publishFoodle = async () => {
    const api = new FoodleAPI();
    try {
      await api.updateFoodle(id, { isPrivate: !values.isPrivate });
      setValues({ ...values, isPrivate: !values.isPrivate });
    } catch (err) {
      console.error(err);
      setValues({ ...values });
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
            <Grid item xs={6} display="flex" alignItems="center">
              <Typography variant="body1">
                {values.title}-Rezept
                {values.author &&
                  ` von ${capitalize(values.author.firstName)} ${capitalize(
                    values.author.lastName
                  )}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <DetailsMenu
                  onDelete={deleteFoodle}
                  onPublish={publishFoodle}
                  isPrivate={values.isPrivate}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageSlider id={id} images={values.images} />
          <Box display="flex" justifyContent="space-between" paddingTop={1}>
            <UploadImageButton id={id} />
            <EditImagesButton id={id} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
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
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <IngredientsList foodleId={id} data={values.ingredients} editable />
        </Grid>
        <Grid item xs={12} md={6}>
          <TutorialList foodleId={id} data={values.steps} editable />
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
