import React from "react";
import { Outlet } from 'react-router-dom';

const Feed = () => {
    return (
        <>
            <h1> Feed List </h1>
            <Outlet/>
        </>
    );
}

export default Feed;