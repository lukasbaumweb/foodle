import React, { useState } from "react";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AddIcon from "@mui/icons-material/Add";
import ROUTES from "../utils/routes";
import { useNavigate } from "react-router-dom";

const FoodleDial = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      icon: <AddIcon />,
      name: "Foodle",
      onClick: () => {
        navigate(ROUTES.private.createFoodle.path);
      },
    },
  ];

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="foodledial"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default FoodleDial;
