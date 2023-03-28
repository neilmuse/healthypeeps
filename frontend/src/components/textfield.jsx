import { TextField as MUITextField } from '@mui/material';

const TextField = ({
  autoFocus,
  required,
  name,
  label,
  type,
  autoComplete,
  maxRows
}) => (
  
  <MUITextField
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

export default TextField;
