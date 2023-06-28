const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const imageContainerStyle = {
    width: '150px',
    height: '150px',
    position: 'relative'
};

const imageStyleCard = {
    width: '75%',
    height: '75%',
    objectFit: 'cover'
};

const imageContainerStyleCard = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export { imageStyle, imageStyleCard, imageContainerStyle, imageContainerStyleCard, modalStyle };