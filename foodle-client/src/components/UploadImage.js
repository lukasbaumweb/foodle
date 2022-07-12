import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import NoImage from "../assets/images/no-image.png";
import FoodleAPI from "../utils/api";

const UploadImage = ({ id }) => {
  const [values, setValues] = useState({
    loading: true,
    imageId: null,
    image: NoImage,
    progress: null,
  });

  useEffect(() => {
    const api = new FoodleAPI();
    api
      .getFoodleImages(id)
      .then(({ data }) => {
        if (data.images.length > 0) {
          const image = data.images[0];
          const url = image.publicUrl;

          setValues((state) => ({
            ...state,
            image: url,
            imageId: image._id,
            loading: false,
          }));
        } else {
          setValues((state) => ({
            ...state,
            image: NoImage,
            loading: false,
          }));
        }
      })
      .catch((err) => console.error(err));

    return () => {};
  }, [id]);

  const loadingOptions = {
    onUploadProgress: (progressEvent) => {
      const { total, loaded } = progressEvent;
      const precentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setValues({ ...values, progress: precentage });
    },
  };

  const uploadImage = (image) => {
    const formData = new FormData();
    try {
      formData.append("files", image);
      const api = new FoodleAPI();

      api
        .uploadImages(id, formData, loadingOptions)
        .then(() => {
          setValues({
            ...values,
            image: URL.createObjectURL(image),
            progress: null,
          });
        })
        .catch((err) => console.error(err));
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      setValues({ ...values, error: { type: "error", message } });
    }
  };

  const deleteImage = () => {
    const api = new FoodleAPI();

    api
      .deleteFoodleImage(id, values.imageId)
      .then(() => {
        setValues({
          ...values,
          image: NoImage,
          imageId: null,
        });
      })
      .catch((err) => console.error(err));
  };

  if (values.loading || values.progress !== null) {
    return (
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress
          variant={values.loading ? "indeterminate" : "determinate"}
          value={values.progress}
        />
        {!values.loading && (
          <Box
            sx={{
              top: "50%",
              left: "50%",
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${Math.round(values.progress)}%`}</Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <div>
      <Box>
        <Card>
          <CardActionArea component="label" htmlFor="uploadBtn">
            <CardMedia
              component="img"
              sx={{
                maxHeight: "400px",
                height: "100%",
                backgroundSize: "contain",
              }}
              image={values.image}
              alt="Foodle hochladen"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Bilder hochladen
              </Typography>{" "}
              <input
                id="uploadBtn"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  uploadImage(e.target.files[0]);
                }}
                disabled={values.imageId !== null}
                hidden
              />
            </CardContent>
          </CardActionArea>
          {values.imageId !== null && (
            <CardActions>
              <Button size="small" color="primary" onClick={deleteImage}>
                Entfernen
              </Button>
            </CardActions>
          )}
        </Card>
      </Box>
    </div>
  );
};

export default UploadImage;
