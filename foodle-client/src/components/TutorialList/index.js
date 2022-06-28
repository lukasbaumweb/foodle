import React from "react";
import { Paper } from "@mui/material";

import DraggableList from "./DraggableList";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TutorialList = ({ data, editable }) => {
  const [items, setItems] = React.useState(data || []);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };

  return (
    <Paper>
      <DraggableList items={items} onDragEnd={onDragEnd} editable />
    </Paper>
  );
};

export default TutorialList;
