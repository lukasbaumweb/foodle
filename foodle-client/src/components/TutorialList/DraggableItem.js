import React, { useRef } from "react";
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
import { useDrag, useDrop } from "react-dnd";
import { CONFIG } from "../../utils/config";

const CustomListItem = styled(ListItem)(({ theme }) => ({
  "&.dragging": {
    border: "1px solid " + theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
}));

const DraggableListItem = ({
  id,
  text,
  index,
  moveCard,
  onEdit,
  onDelete,
  editable,
}) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: CONFIG.TYPES.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: CONFIG.TYPES.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <CustomListItem
      ref={ref}
      data-handler-id={handlerId}
      className={isDragging ? "dragging" : ""}
      secondaryAction={
        editable && (
          <>
            <IconButton
              size="small"
              edge="end"
              aria-label="edit"
              onClick={() => onEdit(id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(id)}
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
      <ListItemText primary={`${index + 1}. ${text}`} />
    </CustomListItem>
  );
};

export default DraggableListItem;
