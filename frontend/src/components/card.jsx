import { Card as MUICard, CardContent } from '@mui/material';

const Card = ({
    children
}) => (
  
    <MUICard sx={{ display: 'flex', justifyContent: 'center'}}>
        <CardContent sx={{maxWidth: "md"}}>   
            {children}
        </CardContent>
    </MUICard>
);

export default Card;
