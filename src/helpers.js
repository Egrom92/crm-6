export const getDateValue = (dateValue) => {
    if (dateValue) {
        const date = new Date(dateValue);
        const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

        return dateString;
    }
    return '';
};

