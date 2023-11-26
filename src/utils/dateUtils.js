const formatDate = (str) => {
    const inputDate = new Date(str);

    const day = inputDate.getUTCDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[inputDate.getUTCMonth()];
    const year = inputDate.getUTCFullYear();

    const formattedDate = `${month} ${day} , ${year}`;
    return formattedDate;
}

export default formatDate;