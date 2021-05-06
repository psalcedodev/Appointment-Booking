# Baapt

Baapt is a MEVN (MongoDB, Express, VueJS, NodeJS) web application that allows your customers to make an appointment while you care for your business.

# Demo Links
* [Client Front](https://psalcedo.com/bappt/)
* [Admin Control Panel](https://psalcedo.com/bappt/admincp/)
# Clientside demo
# ![](/demo/clientside.gif)
# Admin Control Panel demo
# ![](/demo/admincp.gif)

# Design resources
* Bootstrap
* Material Design
* Font Awesome icons

## Installation

Use npm

```bash
npm i body-parser cors express mongoose morgan nodemon
```
```
Go to /server
type npm run dev to start the server
```

## Resource

-   Date
-   Time
-   First Name
-   Last Name
-   Phone
-   Email
-   Appointment Status
-   Created (Date when the appointment was created)

### Mongoose Schema

```
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
```

### REST Endpoints

| Name                                   | Method | Path                        |
| -------------------------------------- | ------ | --------------------------- |
| Retrieve appointments collection       | GET    | /appointments               |
| Create appointments member             | POST   | /appointments               |
| Update appointments member by id       | PUT    | /appointments:id            |
| Remove appointments member by id       | DELETE | /appointments:id            |
| Retrieve Canceled appointments         | GET    | /appointments/canceled      |
| Retrieve Completed appointments        | GET    | /appointments/completed     |
| Update appointment status to Completed | PUT    | /appointments/completed/:id |
| Update appointment status to Canceled  | PUT    | /appointments/canceled/:id  |

## Contributing

Bappt is under development.

## License

[MIT](https://choosealicense.com/licenses/mit/)
# Appointment-Booking
