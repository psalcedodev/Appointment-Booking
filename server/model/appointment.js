const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newAppointment = new Schema({
    apptDate: {
        type: String,
        required: [true, " Date required"]
    },
    apptTime: {
        type: String,
        required: true
    },
    apptFname: {
        type: String,
        required: true
    },
    apptLname: {
        type: String,
        required: true
    },
    apptPhone: {
        type: Number,
        required: true
    },
    apptEmail: {
        type: String,
        required: true
    },
    apptStatus: {
        type: String,
        default: "Pending"
    },
    apptDateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("appointment", newAppointment);
