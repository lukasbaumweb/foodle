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
} from "@mui/material";
import FoodleAPI from "../../../utils/api";
import Loader from "../../../components/Loader";
import { translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";
import AddFiles from "../../../assets/svg/add-files.svg";
import IngredientsList from "../../../components/IngredientsList";
import TutorialList from "../../../components/TutorialList/index";

const CreateRecipe = () => {
  const [values, setValues] = useState({
    loading: false,
    title: "",
    description: "",
    ingredients: [],
    error: {},
  });

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

    const payload = {};
    const api = new FoodleAPI();

    api
      .createFoodle(payload)
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

  return (
    <Container sx={{ pt: 3 }}>
      <Grid container spacing={2} component="form" onSubmit={onSubmit}>
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
                  Speichere dein Rezept erst ab, bevor du Bilder hochladen
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
                label="Titel des Rezepts"
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
                rows={3}
                helperText="z.B. Mega leckere Spaghetti Variante nach Sheldon Cooper"
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <IngredientsList editable />
        </Grid>
        <Grid item xs={12} md={6}>
          <TutorialList editable />
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
