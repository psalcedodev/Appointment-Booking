// @ts-nocheck
var getPrevAppointmentsFromServer = function() {
    return fetch("http://localhost:3000/appointments/previous");
};

var getCompletedAppointments = function() {
    return fetch("http://localhost:3000/appointments/completed");
};
var getCancelledAppointments = function() {
    return fetch("http://localhost:3000/appointments/cancelled");
};
var getAppointmentsFromServer = function() {
    return fetch("http://localhost:3000/appointments");
};

var getOneAppointmentFromServer = function(id) {
    return fetch("http://localhost:3000/appointments/" + id);
};

var changeStatusToCompleted = function(id) {
    return fetch("http://localhost:3000/appointments/completed/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        }
    });
};
var changeStatusToCanceled = function(id) {
    return fetch("http://localhost:3000/appointments/cancel/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        }
    });
};
var DeleteAppointmentOnServer = function(id) {
    try {
        return fetch("http://localhost:3000/appointments/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
            }
        });
    } catch (e) {
        console.log(e);
    }
};

var UpdateAppointmentOnServer = function(
    id,
    newApptDate,
    newApptTime,
    newFirstname,
    newLastname,
    newPhone,
    newEmail
) {
    var data = `date=${encodeURIComponent(newApptDate)}`;
    data += `&time=${encodeURIComponent(newApptTime)}`;
    data += `&firstname=${encodeURIComponent(newFirstname)}`;
    data += `&lastname=${encodeURIComponent(newLastname)}`;
    data += `&phone=${encodeURIComponent(newPhone)}`;
    data += `&email=${encodeURIComponent(newEmail)}`;

    return fetch("http://localhost:3000/appointments/" + id, {
        body: data,
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};
var createAppointmentsOnServer = function(
    newApptDate,
    newApptTime,
    newFirstname,
    newLastname,
    newPhone,
    newEmail
) {
    var data = `date=${encodeURIComponent(newApptDate)}`;
    data += `&time=${encodeURIComponent(newApptTime)}`;
    data += `&firstname=${encodeURIComponent(newFirstname)}`;
    data += `&lastname=${encodeURIComponent(newLastname)}`;
    data += `&phone=${encodeURIComponent(newPhone)}`;
    data += `&email=${encodeURIComponent(newEmail)}`;

    return fetch("http://localhost:3000/appointments", {
        body: data,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

Vue.use(vuelidate.default);

var app = new Vue({
    el: "#app",
    data: {
        id: "",
        newApptDate: "",
        newApptTime: "",
        newFirstname: "",
        newLastname: "",
        newPhone: "",
        newEmail: "",
        appointments: [],
        appointments2: [],
        completedAppts: [],
        cancelledAppts: [],
        apptConfirm: true,
        availableTimes: [
            { id: 0, time: "12:00 PM", reserved: false },
            { id: 1, time: "12:30 PM", reserved: false },
            { id: 2, time: "1:00 PM", reserved: false },
            { id: 3, time: "1:30 PM", reserved: false },
            { id: 4, time: "2:00 PM", reserved: false },
            { id: 5, time: "2:30 PM", reserved: false },
            { id: 6, time: "3:00 PM", reserved: false },
            { id: 7, time: "3:30 PM", reserved: false },
            { id: 8, time: "4:00 PM", reserved: false },
            { id: 9, time: "4:30 PM", reserved: false },
            { id: 10, time: "5:00 PM", reserved: false },
            { id: 11, time: "5:30 PM", reserved: false },
            { id: 12, time: "6:00 PM", reserved: false },
            { id: 13, time: "6:30 PM", reserved: false },
            { id: 14, time: "7:00 PM", reserved: false },
            { id: 15, time: "7:30 PM", reserved: false },
            { id: 16, time: "8:00 PM", reserved: false },
            { id: 17, time: "8:30 PM", reserved: false },
            { id: 18, time: "9:00 PM", reserved: false }
        ]
    },
    validations: {
        newApptDate: {
            required: validators.required
        },
        newApptTime: {
            required: validators.required
        },
        newFirstname: {
            required: validators.required
        },
        newLastname: {
            required: validators.required
        },
        newPhone: {
            required: validators.required,
            integer: validators.integer,
            minLength: validators.minLength(10)
        },
        newEmail: {
            required: validators.required,
            email: validators.email
        }
    },
    methods: {
        submitForm() {
            this.$v.newApptDate.$touch();
            this.$v.newApptTime.$touch();
            this.$v.newFirstname.$touch();
            this.$v.newLastname.$touch();
            this.$v.newPhone.$touch();
            this.$v.newEmail.$touch();
            if (!this.$v.$invalid) {
                console.log("form validated");
            } else {
                console.log("unable to validate");
            }
        },
        checkSlots: function() {
            var available = this.availableTimes;
            //declares all the time slots as false to show available times
            available.forEach(time => {
                time.reserved = false;
            });
            var dateselected = this.newApptDate;
            getAppointmentsFromServer().then(response =>
                response.json().then(data =>
                    data.forEach(appt => {
                        // console.log(appt.AppTime);

                        available.forEach(function(time) {
                            // console.log(appt.AppTime);
                            if (
                                dateselected == appt.apptDate &&
                                appt.apptTime == time.time
                            ) {
                                // console.log("found a matching time:", time);
                                time.reserved = true;
                                time.time = time.time;
                            }
                        });
                    })
                )
            );
        },

        clientGoButton: function() {
            createAppointmentsOnServer(
                this.newApptDate,
                this.newApptTime,
                this.newFirstname,
                this.newLastname,
                this.newPhone,
                this.newEmail
            ).then(response => {
                if (response.status == 201) {
                    this.apptConfirm = false;
                    this.showAppointments();
                }
            });
        },
        companyCreateButton: function() {
            this.apptConfirm = !this.apptConfirm;
            createAppointmentsOnServer(
                this.newApptDate,
                this.newApptTime,
                this.newFirstname,
                this.newLastname,
                this.newPhone,
                this.newEmail
            ).then(response => {
                if (response.status == 201) {
                    alert("Appointment created");

                    this.showAppointments();
                    this.clearFields();
                }
            });
        },

        clearFields: function() {
            this.newApptDate = "";
            this.newApptTime = "";
            this.newFirstname = "";
            this.newLastname = "";
            this.newPhone = "";
            this.newEmail = "";
        },
        deleteButtonClicked: function(id) {
            const result = confirm(
                "Are you sure you want to delete this appointment?"
            );
            if (result) {
                DeleteAppointmentOnServer(id).then(response => {
                    if (response.status == 200) {
                        this.showAppointments();
                    }
                });
            }
        },
        cancel: function() {
            this.clearFields();
        },
        updateButtonClicked: function(id) {
            getOneAppointmentFromServer(id).then(response => {
                response.json().then(appointments => {
                    (this.id = appointments._id),
                        (this.newApptDate = appointments.apptDate);
                    this.newApptTime = appointments.apptTime;
                    this.newFirstname = appointments.apptFname;
                    this.newLastname = appointments.apptLname;
                    this.newPhone = appointments.apptPhone;
                    this.newEmail = appointments.apptEmail;
                });
            });
            this.updateButton = function(id) {
                UpdateAppointmentOnServer(
                    this.id,
                    this.newApptDate,
                    this.newApptTime,
                    this.newFirstname,
                    this.newLastname,
                    this.newPhone,
                    this.newEmail
                ).then(response => {
                    if (response.status == 200) {
                        this.showAppointments();
                        this.clearFields();
                    }
                });
            };
        },

        getCompletedAppts: function() {
            getCompletedAppointments().then(response => {
                response.json().then(appointments => {
                    console.log(appointments);
                    this.completedAppts = appointments;
                });
            });
        },
        getCancelledAppts: function() {
            getCancelledAppointments().then(response => {
                response.json().then(appointments => {
                    this.cancelledAppts = appointments;
                });
            });
        },
        completed: function(id) {
            const result = confirm("Are you done with this appointment?");
            if (result) {
                changeStatusToCompleted(id).then(response => {
                    if (response.status == 200) {
                        this.showPrevAppts();
                        this.showAppointments();
                        this.getCompletedAppts();
                        this.getCancelledAppts();
                    }
                });
            }
        },
        canceled: function(id) {
            const result = confirm(
                "Are sure you want to cancel this appointment?"
            );
            if (result) {
                changeStatusToCanceled(id).then(response => {
                    if (response.status == 200) {
                        this.showPrevAppts();
                        this.showAppointments();
                        this.getCompletedAppts();
                        this.getCancelledAppts();
                    }
                });
            }
        },

        showPrevAppts: function() {
            getPrevAppointmentsFromServer().then(response => {
                response.json().then(appointments => {
                    this.appointments2 = appointments;

                    // var apptStats = this.appointments2;
                    // apptStats.forEach(data => {
                    //     if (
                    //         data.apptStatus == "Completed" &&
                    //         data.apptStatus != "Cancel"
                    //     ) {
                    //         this.isDark = true;
                    //     }
                    // });
                });
            });
        },
        showAppointments: function() {
            getAppointmentsFromServer().then(response => {
                response.json().then(appointments => {
                    console.log(appointments);
                    this.appointments = appointments;
                });
            });
        }
    },

    created: function() {
        this.showAppointments();
        this.showPrevAppts();
        this.getCompletedAppts();
        this.getCancelledAppts();
        setInterval(() => {
            console.log("Refreshed");
            this.showAppointments();
            this.showPrevAppts();
            this.getCompletedAppts();
            this.getCancelledAppts();
        }, 15000);
    }
});
