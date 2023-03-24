import { Card, CardContent } from "@mui/material";

const CardComponent = ({
    children
}) => (
  
    <Card sx={{ display: 'flex', justifyContent: 'center'}}>
        <CardContent sx={{maxWidth: "md"}}>   
            {children}
        </CardContent>
    </Card>
);

export default CardComponent;
