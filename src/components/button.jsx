import { Button } from "@mui/material";

const OutlinedButton = ({
    text
}) => (

  <Button
    type="submit"
    fullWidth 
    variant="outlined"
  >
    {text}
  </Button>
);

export default OutlinedButton;
