import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import FoodleAPI from "../utils/api";
import ROUTES from "../utils/routes";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DeleteFoodleButton = ({ id, ...props }) => {
  const [values, setValues] = useState({ open: false, dialogOpen: false });

  const navigate = useNavigate();

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

  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  return (
    <Box {...props}>
      <Tooltip title="Foodle löschen">
        <IconButton
          color="error"
          onClick={() => setValues({ ...values, dialogOpen: true })}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={values.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert onClose={handleClose} severity="warmning" sx={{ width: "100%" }}>
          Foodle gelöscht
        </Alert>
      </Snackbar>
      <Dialog
        open={values.dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Löschen bestätigen</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Du bist im Begriff den Eintrag unwiderruflich zu löschen. Möchtest
            du fortfahren?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setValues({ ...values, dialogOpen: false })}>
            Abbrechen
          </Button>
          <Button onClick={deleteFoodle} autoFocus variant="contained">
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteFoodleButton;
