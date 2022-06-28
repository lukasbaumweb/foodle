import React from "react";
import DraggableListItem from "./DraggableItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const DraggableList = React.memo(({ items, onDragEnd, editable, onAdd }) => {
  const onEdit = (id) => {};
  const onDelete = (id) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card>
        <CardHeader
          action={
            editable && (
              <Tooltip title="Schritt hinzufügen">
                <IconButton aria-label="add step">
                  <AddIcon />
                </IconButton>
              </Tooltip>
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
                {items.map((item, index) => (
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
        </CardContent>
      </Card>
    </DragDropContext>
  );
});

export default DraggableList;
