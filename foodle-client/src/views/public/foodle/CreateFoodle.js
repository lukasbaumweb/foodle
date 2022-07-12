import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getLanguage, translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";
import NoImage from "../../../assets/images/no-image.png";
import FoodleAPI from "../../../utils/api";
import Loader from "../../../components/Loader";
import ROUTES from "../../../utils/routes";
import SelectTags from "../../../components/SelectTags";

const CreateFoodle = () => {
  const [values, setValues] = useState({
    loading: false,
    title: "",
    description: "",
    category: "",
    tags: [],
    startPortion: 1,
    isDirty: false,
    errors: {},
  });

  useEffect(() => {
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
  }, [values.isDirty]);

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
    e.preventDefault();

    if (!validate()) return;

    setValues({ ...values, loading: true });

    const payload = {
      title: values.title,
      description: values.description,
      category: values.category,
      tags: values.tags.map((tag) => tag.name || tag),
      startPortion: values.startPortion,
    };

    const api = new FoodleAPI();

    api
      .createFoodle(payload)
      .then((result) => {
        const id = result.data._id;
        navigate(ROUTES.private.editFoodle.path.replace(":id", id));
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
                sx={{
                  maxHeight: "300px",
                  height: "100%",
                  backgroundSize: "contain",
                }}
                image={NoImage}
                alt="Foodle hochladen"
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

                  {getLanguage()["categories"].map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText error={values.errors["category"]?.length > 0}>
                  {values.errors["category"]?.length > 0
                    ? values.errors["category"]
                    : "z.B. bei Spaghetti Carbonara: Gericht"}
                </FormHelperText>
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

export default CreateFoodle;
