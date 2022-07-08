import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  MobileStepper,
  Typography,
  useTheme,
} from "@mui/material";
import AddFiles from "../../assets/svg/add-files.svg";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import FoodleAPI from "../../utils/api";

const ImageSlider = ({ id }) => {
  const isNew = id === "new";

  const [values, setValues] = useState({
    loading: isNew ? false : true,
    images: [],
    currentImage: 0,
  });
  const theme = useTheme();

  useEffect(() => {
    const api = new FoodleAPI();

    const getFoodleImages = async () => {
      api
        .getFoodleImages(id)
        .then(({ data }) => {
          if (data)
            setValues((state) => ({
              ...state,
              images: data?.images || [],
              loading: false,
            }));
          else setValues((state) => ({ ...state, loading: false }));
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

  const handleNext = () => {
    setValues({ ...values, currentImage: values.currentImage + 1 });
  };

  const handleBack = () => {
    setValues({ ...values, currentImage: values.currentImage - 1 });
  };

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

  if (isNew) {
    return (
      <Box>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={AddFiles}
            alt="Eintrag speichern"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bild hinzufügen
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Speichere dein Foodle erst ab bevor du Bilder hochladen kannst.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const maxSteps = values.images.length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box minHeight="255px">
        {values.images.map((image, index) => (
          <Box key={index} sx={{ display: "flex" }}>
            {Math.abs(values.currentImage - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: values.currentImage === index ? "block" : "none",
                  maxWidth: 400,
                  overflow: "hidden",
                  width: "auto",
                  margin: "auto",
                }}
                src={image.publicUrl}
                alt={image.title || "Kein Titel"}
              />
            ) : null}
          </Box>
        ))}
        {values.images.length === 0 && (
          <Box>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={AddFiles}
                alt="Eintrag speichern"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Keine Bilder gefunden
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lade eine Bild hoch, um dein Foodle anzupreisen
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
      {values.images.length > 0 && (
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={values.currentImage}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={values.currentImage === maxSteps - 1}
            >
              Vorwärts
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={values.currentImage === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Zurück
            </Button>
          }
        />
      )}
    </Box>
  );
};

export default ImageSlider;
