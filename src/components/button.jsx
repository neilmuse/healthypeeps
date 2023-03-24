import { Button as MUIButton } from "@mui/material";

const Button = ({ text, submit, primary = false, ...props }) => {
  const options = {
    type: submit ? submit : undefined,
    color: "primary",
    variant: primary ? "contained" : "outlined",
    sx: { height: primary ? "4em" : undefined },
    fullWidth: true,
    ...props
  }

  return <MUIButton {...options}>
    {text}
  </MUIButton>
};

export default Button;
