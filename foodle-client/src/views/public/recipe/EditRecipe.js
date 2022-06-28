import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Box, TextField } from "@mui/material";
import FoodleAPI from "../../../utils/api";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";
import ImageSlider from "../../../components/ImageSlieder";
import UploadImageButton from "../../../components/UploadImageButton";
import EditImagesButton from "../../../components/EditImagesButton";

const EditRecipe = () => {
  const [values, setValues] = useState({
    loading: true,
    title: "",
    ingredients: [],
    error: {},
  });

  const { id } = useParams();

  useEffect(() => {
    const api = new FoodleAPI();

    const getFoodle = async () => {
      api
        .getFoodle(id)
        .then(({ data }) => {
          console.log(data);
          setValues((state) => ({
            ...state,
            ...data,
            ingredients: data.ingredients,
            loading: false,
          }));
        })
        .catch((err) => {
          console.error(err);
          setValues((state) => ({ ...state, loading: false }));
        });
    };

    if (id !== "new") {
      getFoodle();
    } else {
      setValues((state) => ({ ...state, loading: false }));
    }

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

    const payload = {};
    const api = new FoodleAPI();

    api
      .updateFoodle(payload)
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
          <ImageSlider id={id} images={values.images} />
          <Box display="flex" justifyContent="space-between" paddingTop={1}>
            <UploadImageButton id={id} />
            <EditImagesButton id={id} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="title"
            label="Titel"
            variant="standard"
            onChange={handleChange}
            value={values.title}
            fullWidth
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

export default EditRecipe;
