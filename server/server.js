const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const appointment = require("./router/appointment");
const port = process.env.PORT || 3000;
require('dotenv').config();
//*Mongoose connection to MongoDB
mongoose
    .connect(
        `${process.env.MONGODB}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//*Midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use("/", appointment);

app.listen(port, () => console.log(`Server listening on port: ${port}`));