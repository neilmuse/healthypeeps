import moment from 'moment';

const convertTime = (createdAt) => {
    const converted_time = moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
    return converted_time;
};

export default convertTime;