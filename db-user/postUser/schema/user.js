var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name 0"]
        },
        userName: {
            type: String,
            unique: true,
            required: [true, "userName 0"]
        },
        email: {
            type: String,
            unique: true,
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
            unique: true,
            required: [true, "phone 0"]
        },
        role: {
            type: String,
            enum: ["admin", "employee", "pic", "owner"],
            required: [true, "role 0"]
        },
        outlet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Outlet",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
