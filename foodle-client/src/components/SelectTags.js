import React, { useEffect, useState } from "react";
import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import { capitalize, Entity, getLocalStorage } from "../utils/functions";
import { getLanguage } from "../utils/translater";

const SelectTags = ({ onChangeTags, ...props }) => {
  const [values, setValues] = useState({
    open: false,
    selectableTags: [],
    loading: true,
  });

  useEffect(() => {
    (async () => {
      const tags = await getLocalStorage(Entity.TAG);
      const OPTIONS = Object.values(tags).map((option) => ({
        ...option,
        translated: getLanguage().tags[option.name] || option.name,
      }));

      setValues((state) => ({
        ...state,
        selectableTags: OPTIONS,
        loading: false,
      }));
    })();

    return () => {};
  }, []);

  const transformTags = (items) =>
    items.map((val) => {
      if (typeof val === "object") return val;
      return {
        name: val,
        translated: capitalize(getLanguage().tags[val] || val),
      };
    });

  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags-filled"
      options={values.selectableTags}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.translated || option.name}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.translated}
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
        />
      )}
      value={transformTags(props.value)}
      onChange={(_event, newValue) => {
        const transformedValues = transformTags(newValue);
        onChangeTags(transformedValues);
      }}
    />
  );
};

export default SelectTags;
