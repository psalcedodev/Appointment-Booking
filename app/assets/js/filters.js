Vue.filter("dateFormat", function(value) {
    try {
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tues";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        var d = new Date(value);
        var n = weekday[d.getDay() + 1];
        var m = month[d.getMonth()];
        return n + ", " + m + " " + (d.getDate() + 1) + ", " + d.getFullYear();
    } catch (e) {
        console.log(e);
    }
});

/*Capitalize*/
Vue.filter("capitalize", function(value) {
    return value.toUpperCase();
});
