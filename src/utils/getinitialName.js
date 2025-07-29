const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
        //i.e only first name
        return parts[0][0].toUpperCase()
    }
    else {
        // Take first letter of first and last name
        return (parts[0][0] + (parts[parts.length - 1][0] || "")).toUpperCase();
    }



};

export { getInitials };