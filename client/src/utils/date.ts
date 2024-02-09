export const getTimeDifference=(date:Date) => {
    // Get the current date
    const currentDate = new Date();
    
    console.log(currentDate)
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - new Date(date).getTime();

    // Calculate the time difference in minutes, hours, and days
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Determine the time label based on the time difference
    let timeLabel = "";
    if (daysAgo >= 2) {
        timeLabel = `${daysAgo} days ago`;
    } else if (daysAgo === 1) {
        timeLabel = "1 day ago";
    } else if (hoursAgo >= 2) {
        timeLabel = `${hoursAgo} hours ago`;
    } else if (hoursAgo === 1) {
        timeLabel = "1 hour ago";
    } else if (minutesAgo >= 2) {
        timeLabel = `${minutesAgo} minutes ago`;
    } else if (minutesAgo === 1) {
        timeLabel = "1 minute ago";
    } else {
        timeLabel = "Just now";
    }

    return timeLabel

    // Update the datePast state with the time label
};