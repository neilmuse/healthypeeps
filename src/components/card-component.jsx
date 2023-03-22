import { Card, CardContent } from "@mui/material";

const CardComponent = ({
    props
}) => (
  
    <Card style={{ margin: '20px' }}>
        <CardContent>   
            {props}
        </CardContent>
    </Card>
);

export default CardComponent;
