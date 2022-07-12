import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Fade,
  IconButton,
  Modal,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const ImageModal = ({ alt, imageSrc }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ padding: 1, textAlign: "center" }}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            src={imageSrc}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "500px",
              objectFit: "cover",
            }}
            alt={alt}
          />
        </CardActionArea>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleClose} sx={{ m: 1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={style}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={imageSrc}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "95vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  alt={alt}
                />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ImageModal;
