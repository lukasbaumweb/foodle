import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { translate } from "../utils/translater";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FoodleAPI from "../utils/api";

const UploadImageButton = ({ id }) => {
  const isNew = id === "new";

  const [values, setValues] = useState({
    images: [],
    progress: null,
    dialogOpen: false,
  });

  if (values.progress !== null) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={values.progress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(values.progress)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const handleClose = () =>
    setValues({ ...values, dialogOpen: false, images: [] });

  const loadingOptions = {
    onUploadProgress: (progressEvent) => {
      const { total, loaded } = progressEvent;
      const precentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setValues({ ...values, progress: precentage });
    },
  };

  const uploadImages = () => {
    setValues({ ...values, loading: true });

    const api = new FoodleAPI();

    const formData = new FormData();
    try {
      formData.append("files", values.images);

      console.log(formData, values.images);
      api
        .uploadImages(id, formData, loadingOptions)
        .then((result) => {
          console.log(result);
          // window.location.reload();
          setValues({ ...values, loading: false });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      setValues({ ...values, error: { type: "error", message } });
    }

    setValues({ ...values, dialogOpen: false, images: values.images });
  };

  return (
    <Box textAlign="center">
      <Button
        variant="contained"
        component="label"
        color="secondary"
        startIcon={<AddPhotoAlternateIcon />}
        disabled={isNew}
      >
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length < 6 && e.target.files.length > 0) {
              setValues({
                ...values,
                images: [...e.target.files],
                dialogOpen: true,
              });
            } else if (e.target.files.length > 6) {
              setValues({
                ...values,
                errors: {
                  all: translate("validation-error/image-upload-limit-reached"),
                },
              });
            }
          }}
          multiple
          hidden
        />
        {values.images?.length > 0
          ? `Hochladen (${values.images.length})`
          : "Bild hinzufügen"}
      </Button>

      <Dialog
        open={values.dialogOpen}
        aria-labelledby="add-image-modal-title"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle id="add-image-modal-title">Bilder hochladen</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {values.images.map((image, index) => {
              const src = URL.createObjectURL(image);

              return (
                <Grid item xs={12} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      position: "relative",
                      minHeight: 200,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      p: 0,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        p: 1,
                        flex: 1,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                      }}
                    >
                      Bild {index + 1}
                    </Typography>
                    <Tooltip
                      sx={{
                        position: "absolute",
                        right: 5,
                        top: 10,
                        zIndex: 1,
                      }}
                      title="Bild entfernen"
                    >
                      <IconButton
                        color="error"
                        onClick={() => {
                          setValues({
                            ...values,
                            dialogOpen: values.images.length !== 1,
                            images: values.images.filter((_, i) => i !== index),
                          });
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>

                    <img
                      src={src}
                      width="auto"
                      style={{
                        filter: "brightness(0.5)",
                        zIndex: 0,
                        margin: "auto",
                        maxHeight: 200,
                      }}
                      alt="Vorschaubild bearbeiten"
                    />
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Abbrechen
          </Button>
          <Button onClick={uploadImages} variant="outlined" autoFocus>
            Hochladen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UploadImageButton;
