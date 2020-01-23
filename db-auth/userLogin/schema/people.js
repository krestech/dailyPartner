var mongoose = require("mongoose");

var peopleSchema = mongoose.Schema(
    {
        //_id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: [true, "name 0"]
        },
        email: {
            type: String,
            required: [true, "email 0"]
        },
        password: {
            type: String,
            required: [true, "password 0"]
        },
        pin: {
            type: String,
            required: [true, "pin 0"]
        },
        phone: {
            type: String,
            required: [true, "phone 0"]
        },
        role: {
            type: String,
            required: [true, "role 0"]
        },
        outlet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Outlets",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("People", peopleSchema);
