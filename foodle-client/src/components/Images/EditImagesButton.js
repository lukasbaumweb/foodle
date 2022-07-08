import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import FoodleAPI from "../../utils/api";

const EditImagesButton = ({ id }) => {
  const isNew = id === "new";
  const [values, setValues] = useState({
    images: [],
    loading: true,
    dialogOpen: false,
    selectedImage: -1,
  });

  useEffect(() => {
    const api = new FoodleAPI();

    const getFoodleImages = async () => {
      api
        .getFoodleImages(id)
        .then(({ data }) => {
          if (data) {
            setValues((state) => ({
              ...state,
              images: data.images,
              loading: false,
            }));
          } else {
            setValues((state) => ({ ...state, loading: false }));
          }
        })
        .catch((err) => {
          console.error(err);
          setValues((state) => ({ ...state, loading: false }));
        });
    };

    if (!isNew) {
      getFoodleImages();
    } else {
      setValues((state) => ({ ...state, loading: false }));
    }

    return () => {};
  }, [id, isNew]);

  if (values.loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const swapItems = (current, target) => {
    const items = values.images;
    const tmp = items[current];
    items[current] = items[target];
    items[target] = tmp;

    setValues({ ...values, images: items });
  };

  const handleClose = () => setValues({ ...values, dialogOpen: false });
  const handleOpen = () => setValues({ ...values, dialogOpen: true });

  const updateImages = () => {};

  const deleteImage = (index) => () => {
    const api = new FoodleAPI();

    api
      .deleteFoodleImage(id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          dialogOpen: values.images.length !== 1,
          images: values.images.filter((_, i) => i !== index),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (isNew || !values.images || values.images?.length === 0) return <></>;

  return (
    <>
      <Button
        startIcon={<EditIcon />}
        color="primary"
        variant="outlined"
        onClick={handleOpen}
      >
        Bilder bearbeiten
      </Button>
      <Dialog
        open={values.dialogOpen}
        aria-labelledby="edit-image-modal-title"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle id="edit-image-modal-title">Bilder bearbeiten</DialogTitle>
        <DialogContent sx={{ minHeight: 300 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <Grid container spacing={1}>
                {values.images?.map((image, index) => {
                  const src = image.publicUrl;
                  const btnStyles = {
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  };

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
                            onClick={deleteImage(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        {index > 0 && (
                          <IconButton
                            sx={{
                              ...btnStyles,
                              left: 2,
                            }}
                            onClick={() => swapItems(index, index - 1)}
                          >
                            <KeyboardArrowLeft />
                          </IconButton>
                        )}
                        {index < values.images.length - 1 && (
                          <IconButton
                            sx={{
                              ...btnStyles,
                              right: 2,
                            }}
                            onClick={() => swapItems(index, index + 1)}
                          >
                            <KeyboardArrowRight />
                          </IconButton>
                        )}

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
                        <Box display="flex">
                          <Typography
                            variant="caption"
                            sx={{ pt: 1, pl: 1, flex: 1 }}
                          >
                            {image.title || "Kein Titel"}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              setValues({ ...values, selectedImage: index })
                            }
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            {values.selectedImage > -1 && (
              <Grid item xs={12} md={3}>
                <Typography>Metadaten bearbeiten</Typography>
                <TextField
                  variant="standard"
                  placeholder="Titel"
                  value={values.images[values.selectedImage]?.title || ""}
                  onChange={(e) => {
                    const items = values.images;
                    items[values.selectedImage].title = e.target.value;
                    setValues({ ...values, images: items });
                  }}
                  fullWidth
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Abbrechen
          </Button>
          <Button onClick={updateImages} variant="outlined" autoFocus>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditImagesButton;
