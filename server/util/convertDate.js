const monthCode =[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

module.exports = function convertDate(dateObj) {

    const _str = dateObj.toLocaleDateString();
    const _arr = _str.split('-');

    return `${monthCode[_arr[1]-1]} ${_arr[2]}, ${_arr[0]}`
}


