import React, { useState } from "react";

import DraggableListItem from "./DraggableItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    const steps = reorder(values.steps, source.index, destination.index);
    setValues({ ...values, steps, sDirty: true });
  };

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

  const addStep = (e) => {
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
        setValues({ ...values, loading: true, isDirty: false });
      })
      .catch((err) => {
        console.error(err);
        setValues({ ...values, loading: true });
      });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
            <Droppable droppableId="droppable-list">
              {(provided) => (
                <List ref={provided.innerRef} {...provided.droppableProps}>
                  {values.steps.map((item, index) => (
                    <DraggableListItem
                      item={item}
                      index={index}
                      key={item.id}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      editable={editable}
                    />
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
            {values.steps.length === 0 && (
              <Typography variant="body2" textAlign="center" color="#9e9e9e">
                {editable
                  ? "Füge einen Schritt oben rechts hinzu!"
                  : "Keine Schritte vorhanden"}
              </Typography>
            )}
          </CardContent>
        </Card>
      </DragDropContext>
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
              label="Titel"
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
