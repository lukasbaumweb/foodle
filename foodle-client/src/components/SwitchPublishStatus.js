import React, { useState } from "react";
import {
  Box,
  Switch,
  Tooltip,
  Snackbar,
  styled,
  FormControlLabel,
} from "@mui/material";
import FoodleAPI from "../utils/api";
import MuiAlert from "@mui/material/Alert";

const PublicStatusSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${encodeURIComponent(
          "#fff"
        )}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#f95738" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${encodeURIComponent(
        "#fff"
      )}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SwitchPublishStatus = ({ isPrivate, id }) => {
  const [values, setValues] = useState({ open: false, isPrivate: isPrivate });

  const changeStatus = async () => {
    const api = new FoodleAPI();
    try {
      await api.updateFoodle(id, { isPrivate: !values.isPrivate });
      setValues({ ...values, isPrivate: !values.isPrivate, open: true });
    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  return (
    <Box>
      <Tooltip title={values.isPrivate ? "Veröffentlichen" : "Privatisieren"}>
        <FormControlLabel
          labelPlacement="start"
          control={
            <PublicStatusSwitch
              inputProps={{ "aria-label": "Öffentlichkeitsstatus ändern" }}
              onChange={(e) => changeStatus()}
              checked={!values.isPrivate}
              sx={{ m: 1 }}
            />
          }
          label={values.isPrivate ? "Privat" : "Öffentlich"}
        />
      </Tooltip>
      <Snackbar
        open={values.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Status geändert
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SwitchPublishStatus;
