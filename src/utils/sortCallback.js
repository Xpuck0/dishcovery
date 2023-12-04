const sortCallback = (a, b, order) => {
        switch (order) {
            case 'likes-ascending':
                return a.likes - b.likes; 
            case 'likes-descending':
                return b.likes - a.likes; 
            case 'date-ascending':
                return new Date(a._createdOn) - new Date(b._createdOn); 
            case 'date-descending':
                return new Date(b._createdOn) - new Date(a._createdOn); 
            case 'name-ascending':
                return a.title.localeCompare(b.title); 
            case 'name-descending':
                return b.title.localeCompare(a.title); 
            default:
                return;
        }
}

export default sortCallback;