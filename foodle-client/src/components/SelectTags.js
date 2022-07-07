import React, { useEffect, useState } from "react";
import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import { Entity, getLocalStorage } from "../utils/functions";

const convertValues = (vals) =>
  vals.map((value) => {
    if (typeof value === "object") return value;
    return { name: value };
  });

const SelectTags = ({ onChangeTags, value }) => {
  const [values, setValues] = useState({
    open: false,
    selectableTags: [],
    loading: true,
  });
  const initValue = convertValues(value.filter((t) => t));

  useEffect(() => {
    (async () => {
      const tags = await getLocalStorage(Entity.TAG);
      const OPTIONS = Object.values(tags);

      setValues((state) => ({
        ...state,
        selectableTags: OPTIONS,
        loading: false,
      }));
    })();

    return () => {};
  }, []);

  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags-filled"
      options={values.selectableTags}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.name}
            {...getTagProps({ index })}
          />
        ))
      }
      open={values.open}
      onOpen={() => {
        setValues({ ...values, open: true });
      }}
      onClose={() => {
        setValues({ ...values, open: false });
      }}
      loading={values.loading}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label="Tags"
          placeholder="Tags eintragen"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {values.loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          helperText="z.B. bei Spaghetti Carbonara: Italien, Hauptspeise"
        />
      )}
      value={initValue}
      onChange={(_event, newValue) => {
        onChangeTags(convertValues(newValue));
      }}
    />
  );
};

export default SelectTags;
