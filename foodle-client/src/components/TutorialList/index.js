import React, { useCallback, useState } from "react";
import update from "immutability-helper";

import DraggableListItem from "./DraggableItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { isObjectEmpty } from "../../utils/functions";
import { v4 as uuidv4 } from "uuid";
import { LoadingButton } from "@mui/lab";
import FoodleAPI from "../../utils/api";

const TutorialList = React.memo(({ foodleId, data, editable }) => {
  const [values, setValues] = useState({
    steps: data || [],
    title: "",
    open: false,
    selectedItemId: null,
    errors: {},
    loading: false,
    isDirty: false,
  });

  const handleClose = () => setValues({ ...values, open: !values.open });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value, isDirty: true });

  const onEdit = (id) => {
    const step = values.steps.find((stp) => stp.id === id);
    setValues({
      ...values,
      selectedItemId: id,
      title: step.title,
      open: true,
    });
  };

  const onDelete = (id) => {
    const stepIndex = values.steps.findIndex((stp) => stp.id === id);

    const steps = values.steps;
    steps.splice(stepIndex, 1);
    setValues({
      ...values,
      isDirty: true,
      steps,
    });
  };

  const validateStep = () => {
    const errors = {};

    if (!values.title || values.title.length === 0) {
      errors["title"] = "Titel erforderlich";
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const addStep = () => {
    if (!validateStep()) return;

    if (values.selectedItemId !== null) {
      const steps = values.steps;
      const stepIndex = values.steps.findIndex(
        (stp) => stp.id === values.selectedItemId
      );
      steps[stepIndex]["title"] = values.title;

      setValues({
        ...values,
        steps,
        title: "",
        selectedItemId: null,
        isDirty: true,
      });
    } else {
      const newStep = {
        id: uuidv4(),
        title: values.title.trim(),
      };

      const steps = values.steps;
      steps.push(newStep);
      setValues({
        ...values,
        steps,
        title: "",
        isDirty: true,
      });
    }
  };

  const saveSteps = () => {
    setValues({ ...values, loading: true });

    const api = new FoodleAPI();

    api
      .updateFoodle(foodleId, { steps: values.steps })
      .then((result) => {
        console.log(result);
        setValues({ ...values, loading: false, isDirty: false });
      })
      .catch((err) => {
        console.error(err);
        setValues({ ...values, loading: false });
      });
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const steps = update(values.steps, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, values.steps[dragIndex]],
        ],
      });

      setValues((state) => ({ ...state, steps, isDirty: true }));
    },
    [values.steps]
  );

  const renderCard = useCallback(
    (text, index, id, onEdit, onDelete, editable) => {
      return (
        <DraggableListItem
          key={id}
          index={index}
          id={id}
          text={text}
          moveCard={moveCard}
          onEdit={onEdit}
          onDelete={onDelete}
          editable={editable}
        />
      );
    },
    [moveCard]
  );

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Card>
          <CardHeader
            action={
              editable && (
                <>
                  <Tooltip title="Schritt hinzufügen">
                    <IconButton
                      aria-label="add step"
                      onClick={() => setValues({ ...values, open: true })}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  {values.isDirty && (
                    <Tooltip title="Schritte speichern">
                      <LoadingButton
                        size="small"
                        onClick={saveSteps}
                        loading={values.loading}
                        variant="contained"
                      >
                        Speichern
                      </LoadingButton>
                    </Tooltip>
                  )}
                </>
              )
            }
            title="Anleitung"
            subheader={
              editable
                ? "Halten und Ziehen zum verschieben"
                : "Zubereitungsschritte"
            }
          />
          <CardContent>
            <List sx={{ py: 2 }}>
              {values.steps.map((item, index) =>
                renderCard(
                  item.title,
                  index,
                  item.id,
                  onEdit,
                  onDelete,
                  editable
                )
              )}
            </List>
            {values.steps.length === 0 && (
              <Typography variant="body2" textAlign="center" color="#9e9e9e">
                {editable
                  ? "Füge einen Schritt oben rechts hinzu!"
                  : "Keine Schritte vorhanden"}
              </Typography>
            )}
          </CardContent>
        </Card>
      </DndProvider>
      <Dialog
        open={values.open}
        onClose={handleClose}
        maxWidth="sm"
        onSubmit={addStep}
        fullWidth
      >
        <DialogTitle>Schritt hinzufügen</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Beschreibung"
              variant="filled"
              value={values.title}
              onChange={handleChange}
              error={values.errors["title"]?.length > 0}
              helperText={values.errors["title"]}
              rows={5}
              multiline
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose}>Schließen</Button>
          <Button onClick={addStep} variant="contained">
            {values.selectedItemId !== null ? "Speichern" : "Hinzufügen"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default TutorialList;
