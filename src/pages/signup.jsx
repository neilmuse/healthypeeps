import React from "react";
import { Outlet } from 'react-router-dom';

const Signup = () => {
    return (
        <>
            <h1> Sign Up </h1>
            <Outlet/>
        </>
    );
}

export default Signup;