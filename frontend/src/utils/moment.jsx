import moment from 'moment';

const convertTime = (createdAt) => {
    const currentTime = moment();
    const createdTime = moment(createdAt);
    const diffInMinutes = currentTime.diff(createdTime, 'minutes');
    const diffInHours = currentTime.diff(createdTime, 'hours');
    
    if (diffInMinutes < 60) {
        // If less than an hour has passed, return the difference in minutes (e.g., "5m")
        return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
        // If less than a day (but more than an hour) has passed, return the difference in hours (e.g., "23h")
        return `${diffInHours}h`;
    } else {
        // If a day or more has passed, return the abbreviated month and date (e.g., "Jun 22")
        return createdTime.format("MMM D");
    }
};

export default convertTime;
