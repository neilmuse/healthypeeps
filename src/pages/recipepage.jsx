import React from "react";
import { Outlet } from 'react-router-dom';

const Recipe = () => {
    const { id } = useParams();
    return (
        <>
            <h1> Recipe {id} </h1>
            <Outlet/>
        </>
    );
}

export default Recipe;