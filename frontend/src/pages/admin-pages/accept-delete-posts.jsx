import * as React from 'react';
import AdminPagination from '../../components/admin-pagination.jsx';
import Button from '../../components/button.jsx';
import Box from '../../components/box.jsx';

import PostCard from '../../views/post-card.jsx';

import recipes from '../../data/recipes.json';

const AdminPosts = () => {
    return (
        <>  
            <Box>
                <AdminPagination />
                <PostCard/>
                <Button text="Accept"/>
                <Button text="Decline"/>
            </Box>
        </>
    );
}

export default AdminPosts;