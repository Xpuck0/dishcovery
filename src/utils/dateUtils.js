const formatDate = (str) => {
    const inputDate = new Date(str);

    const day = inputDate.getUTCDate();
    const monthNames = [
        "Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
        "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
    ];
    const month = monthNames[inputDate.getUTCMonth()];
    const year = inputDate.getUTCFullYear();

    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

export default formatDate;