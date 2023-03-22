import { TextField } from "@mui/material";

const FormTextField = ({
  autoFocus,
  required,
  name,
  label,
  type,
  autoComplete,
  maxRows
}) => (
  
  <TextField
    margin="normal"
    required={required}
    multiline
    maxRows={maxRows ? maxRows : 2}
    fullWidth
    id={name}
    name={name}
    autoComplete={autoComplete ? autoComplete : name}
    label={label}
    type={type}
    autoFocus={autoFocus}
  />
);

export default FormTextField;
