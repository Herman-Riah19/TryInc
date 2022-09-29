import React from 'react'
import { FormControl, Select, InputLabel, FormHelperText, MenuItem } from '@mui/material'
const SelectionOption = ({label, name, value, errors, options}) => {

  return (
    <FormControl>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        id={name}
        name={name}
        value={value}
        label={label}
        fullWidth>
          {Object.keys(options).map(key => (
            <MenuItem value={key}>
              {options[key]}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{errors}</FormHelperText>
    </FormControl>
  )
}

export default SelectionOption