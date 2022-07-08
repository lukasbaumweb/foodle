import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routes";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  maxWidth: 300,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const StyledClearBase = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 5,
  top: "50%",
  transform: "translateY(-50%)",
}));

const SearchBar = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(document.location).searchParams;
    const query = params.get("q");
    if (query && query !== text) {
      setText(query);
    }
    return () => {};
  }, [text]);

  const onSubmit = (e) => {
    e.preventDefault();

    navigate({
      pathname: ROUTES.public.foodles.path,
      search: `?q=${text}`,
    });
  };

  return (
    <Box sx={{ px: 2 }} component="form" onSubmit={onSubmit}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Suchen..."
          inputProps={{ "aria-label": "suchen" }}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {text.trim().length > 0 && (
          <StyledClearBase size="small" onClick={() => setText("")}>
            <ClearIcon fontSize="small" />
          </StyledClearBase>
        )}
      </Search>
    </Box>
  );
};

export default SearchBar;
