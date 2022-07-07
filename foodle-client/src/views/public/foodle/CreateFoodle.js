import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Box,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import FoodleAPI from "../../../utils/api";
import Loader from "../../../components/Loader";
import { getLanguage, translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";
import AddFiles from "../../../assets/svg/add-files.svg";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../utils/routes";
import SelectTags from "../../../components/SelectTags";

const CreateRecipe = () => {
  const [values, setValues] = useState({
    loading: false,
    title: "",
    description: "",
    category: "",
    tags: [],
    ingredients: [],
    errors: {},
  });

  const navigate = useNavigate();

  if (values.loading) return <Loader />;

  const validate = () => {
    const errors = {};

    if (values.title.trim().length === 0) {
      errors["title"] = translate("validation-error/title-missing");
    }

    if (values.category.length === 0) {
      errors["category"] = translate("validation-error/category-missing");
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
      tags: values.tags.map((tag) => tag.name || tag),
    };

    const api = new FoodleAPI();

    api
      .createFoodle(payload)
      .then((result) => {
        console.log(result);
        const id = result.data._id;
        navigate(ROUTES.public.editRecipe.path.replace(":id", id));
      })
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

  return (
    <Container sx={{ pt: 3 }}>
      <Grid
        container
        spacing={2}
        component="form"
        noValidate
        onSubmit={onSubmit}
      >
        <Grid item xs={12} md={6}>
          <Box>
            <Card>
              <CardMedia
                component="img"
                height="200"
                sx={{ width: "auto", p: 1 }}
                image={AddFiles}
                alt="Bild hinzufügen"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bild hinzufügen
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Speichere dein Foodle erst ab, bevor du Bilder hochladen
                  kannst.
                </Typography>
              </CardContent>
            </Card>
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
                helperText={
                  values.errors["title"]?.length > 0
                    ? values.errors["title"]
                    : "z.B. Spaghetti Carbonara"
                }
                error={values.errors["title"]?.length > 0}
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
                rows={3}
                helperText="z.B. Mega leckere Spaghetti Variante nach Sheldon Cooper"
                fullWidth
                multiline
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

                  {Object.entries(getLanguage().mealCategory).map(
                    (category) => (
                      <MenuItem key={category[0]} value={category[0]}>
                        {category[1]}
                      </MenuItem>
                    )
                  )}
                </Select>
                {values.errors["category"]?.length > 0 && (
                  <FormHelperText error={true}>
                    {values.errors["category"]}
                  </FormHelperText>
                )}
              </FormControl>
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

export default CreateRecipe;
