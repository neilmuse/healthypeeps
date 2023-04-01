import React from 'react';
import SingleListing from '../views/listing.jsx';
import listingData from '../data/listing.json';
import Box from '../components/box.jsx';

const ListingPage = () => {
    return (
        <Box>
            <SingleListing/>
        </Box>
    );
};

export default ListingPage;
