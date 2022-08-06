import { useState } from "react";
import { Select as MuiSelect, MenuItem, InputLabel } from "@mui/material";

export default function Select({ label, options, id, ...rest }) {
  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <InputLabel id={label}>{label}</InputLabel>
      <MuiSelect
        labelId={label}
        id={label}
        {...rest}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </MuiSelect>
    </>
  );
}
