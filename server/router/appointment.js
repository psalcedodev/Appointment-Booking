const express = require("express");
const app = express();
const appointment = require("../model/appointment");

//TODO:
//* [x] Get all apoointments for our company
//* [x] Get time slots taken
//* [x] Post appointments
//* [x] Edit appointments
//* [x] Delete appointments

//*Get All appts
app.get("/appointments", async (req, res) => {
    appointment.find({ apptStatus: "Pending" }).then(function(appointments) {
        //Data now loaded
        res.json(appointments);

        res.status(200);
    });
});

//*Get All appts
app.get("/appointments/previous", (req, res) => {
    appointment
        .find({ apptStatus: ["Completed", "Canceled"] })
        .then(function(appointments) {
            //Data now loaded
            res.json(appointments);

            res.status(200);
        });
});
app.get("/appointments/completed", (req, res) => {
    appointment.find({ apptStatus: "Completed" }).then(function(appointments) {
        //Data now loaded
        res.json(appointments);

        res.status(200);
    });
});
app.get("/appointments/cancelled", (req, res) => {
    appointment.find({ apptStatus: "Canceled" }).then(function(appointments) {
        //Data now loaded
        res.json(appointments);

        res.status(200);
    });
});
//* Get only a member from the appointments collection by ID
app.get("/appointments/:id", function(req, res) {
    let apptId = req.params.id;
    res.set("Access-Control-Allow-Origin", "*");
    appointment
        .findOne({ _id: apptId, apptStatus: "Pending" })
        .then(function(appointment) {
            //Data now loaded
            if (appointment) {
                res.json(appointment);
            } else {
                res.sendStatus(404);
            }
        });
});

//* Add a member to the appointments collection
app.post("/appointments", function(req, res) {
    let newAppointment = new appointment({
        apptDate: req.body.date,
        apptTime: req.body.time,
        apptFname: req.body.firstname,
        apptLname: req.body.lastname,
        apptPhone: req.body.phone,
        apptEmail: req.body.email
    });

    newAppointment.save().then(function() {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(201).send("Created");
        console.log("Appointment Created");
        console.log(req.body);
    });
});
//Updates an appointment information
app.put("/appointments/:apptId", async function(req, res) {
    let apptId = req.params.apptId;
    await appointment.findByIdAndUpdate(apptId, {
        apptDate: req.body.date,
        apptTime: req.body.time,
        apptFname: req.body.firstname,
        apptLname: req.body.lastname,
        apptPhone: req.body.phone,
        apptEmail: req.body.email
    });

    res.send("updated");
    console.log(req.body);
});
//Updates an appointment status to completed
app.put("/appointments/completed/:id", async function(req, res) {
    let apptId = req.params.id;
    await appointment.findByIdAndUpdate(apptId, {
        apptStatus: "Completed"
    });
    res.send("updated");
});
//*Updates an appointment status to canceled
app.put("/appointments/cancel/:id", async function(req, res) {
    let apptId = req.params.id;
    await appointment.findByIdAndUpdate(apptId, {
        apptStatus: "Canceled"
    });
    res.send("updated");
});

//* Delete a member by ID
app.delete("/appointments/:id", function(req, res) {
    try {
        let appointmentId = req.params.id;

        appointment
            .findOneAndDelete({ _id: appointmentId })
            .then(function(appointment) {
                //Data now loaded
                if (appointment) {
                    res.send("deleted");
                } else {
                    res.sendStatus(404);
                }
            });
    } catch (e) {
        console.log(e);
    }
});

module.exports = app;
