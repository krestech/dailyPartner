var mongoose = require("mongoose");

var outletSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name 0"]
        },
        latitude: {
            type: String,
            required: [true, "latitude 0"]
        },
        longitude: {
            type: String,
            required: [true, "longitude 0"]
        },
        address: {
            type: String,
            required: [true, "address 0"]
        }
    },
    {
        timestamps: true
    }
);

var Outlet = mongoose.model("Outlet", outletSchema);

module.exports = Outlet;
