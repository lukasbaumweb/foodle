import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CustomListItem = styled(ListItem)(({ theme }) => ({
  "&.dragging": {
    border: "1px solid " + theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
}));

const DraggableListItem = ({ item, index, onEdit, onDelete, editable }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <CustomListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? "dragging" : ""}
          secondaryAction={
            editable && (
              <>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEdit(item.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )
          }
          dense
        >
          {editable && (
            <ListItemIcon size="small">
              <DragHandleIcon />
            </ListItemIcon>
          )}
          <ListItemText primary={`${index + 1}. ${item.title}`} />
        </CustomListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
