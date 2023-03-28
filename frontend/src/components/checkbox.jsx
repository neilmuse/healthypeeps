import * as React from 'react';
import { Checkbox as MUICheckbox } from '@mui/material';

const Checkbox = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <MUICheckbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}

export default Checkbox;