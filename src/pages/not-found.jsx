import React from "react";
import { Outlet } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <>
            <h1> 404 NOT FOUND </h1>
            <Outlet/>
        </>
    );
}

export default PageNotFound;