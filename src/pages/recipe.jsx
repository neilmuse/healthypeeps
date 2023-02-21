import React from "react";
import { Outlet } from 'react-router-dom';

const Recipe = () => {
    return (
        <>
            <h1> Recipe List </h1>
            <Outlet/>
        </>
    );
}

export default Recipe;