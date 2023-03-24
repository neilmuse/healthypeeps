import * as React from "react";
import {
    Grid
  } from "@mui/material";

import GridContainer from '../../components/grid-container.jsx';
import AdminPagination from '../../components/admin-pagination.jsx';
import OutlinedButton from "../../components/button.jsx";
import PageLayout from '../../components/page-box-layout.jsx';

import PostCard from '../../views/post-card.jsx';

import recipes from '../../data/recipes.json';

const AdminPosts = () => {
    return (
        <>  
            <PageLayout>
                <AdminPagination />
                <PostCard/>
                <OutlinedButton text="Accept"/>
                <OutlinedButton text="Decline"/>
            </PageLayout>
        </>
    );
}

export default AdminPosts;