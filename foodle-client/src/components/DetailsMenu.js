import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";

/**
 * @enum {number} CONFIRM_STATES
 **/
const CONFIRM_STATE = {
  DELETE: 0,
  PUBLISH: 1,
  UNPUBLISH: 2,
};

const TRANSLATIONS = [
  {
    title: "Löschen bestätigen",
    text: "Du bist im Begriff den Eintrag unwiderruflich zu löschen. ",
    btn: "Löschen",
  },
  {
    title: "Veröffentlichen bestätigen",
    text: "Du bist im Begriff den Eintrag zu für andere Nutzer Sichtbar zu machen. ",
    btn: "Veröffentlichen",
  },
  {
    title: "Verheimlichen bestätigen",
    text: "Du bist im Begriff den Eintrag zu für andere Nutzer unsichtbar zu machen. ",
    btn: "Verheimlichen",
  },
];

const DetailsMenu = ({ onEdit, onShare, onDelete, onPublish, isPrivate }) => {
  const [values, setValues] = useState({
    anchorEl: null,
    dialogOpen: false,
    func: null,
    state: CONFIRM_STATE.DELETE,
  });

  const menuOpen = Boolean(values.anchorEl);

  const handleClick = (event) => {
    setValues({ ...values, anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setValues({ ...values, anchorEl: null });
  };

  const confirm = (func, state) => () => {
    setValues({ ...values, func, state, dialogOpen: true });
  };

  const approve = async () => {
    if (values.func) {
      await values.func();
    }
    setValues({ ...values, anchorEl: null, dialogOpen: false });
  };

  return (
    <>
      <IconButton
        id="details-trigger-button"
        aria-controls={menuOpen ? "details-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="details-menu"
        anchorEl={values.anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "details-trigger-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {onEdit && (
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Bearbeiten
          </MenuItem>
        )}
        {onShare && (
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            Teilen
          </MenuItem>
        )}

        {onPublish && (
          <MenuItem
            onClick={confirm(
              onPublish,
              isPrivate ? CONFIRM_STATE.PUBLISH : CONFIRM_STATE.UNPUBLISH
            )}
          >
            <ListItemIcon>
              <PublishIcon fontSize="small" />
            </ListItemIcon>
            {isPrivate ? "Veröffentlichen" : "Verheimlichen"}
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem onClick={confirm(onDelete, CONFIRM_STATE.DELETE)}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Löschen
          </MenuItem>
        )}
      </Menu>
      <Dialog
        open={values.dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {TRANSLATIONS[values.state].title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {TRANSLATIONS[values.state].text}
            Möchtest du fortfahren?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setValues({ ...values, dialogOpen: false })}>
            Abbrechen
          </Button>
          <Button onClick={approve} autoFocus variant="contained">
            {TRANSLATIONS[values.state].btn}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailsMenu;
