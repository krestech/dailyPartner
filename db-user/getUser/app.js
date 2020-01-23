// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const mongoose = require("mongoose");
const User = require("./schema/user");
const Outlet = require("./schema/outlet");
//const crypto = require("crypto");
//const cors = require("cors");

// const User = require("./schema/user");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let response;

const connection = mongoose
    .connect(
        "mongodb+srv://dmeals:1234@clusterbebek0-kt7ii.mongodb.net/test?retryWrites=true&w=majority",
        {
            useUnifiedTopology: true,
            dbName: "dailybox",
            useNewUrlParser: true
        }
    )
    .then(console.log("connecting success"))
    .catch(console.log("conneting error"));

mongoose.connection.once("open", function() {
    console.log("Mongoose connection in lambda opened");
});

mongoose.connection.on("error", function() {
    console.error("Error creating mongoose connection in lambda, exiting!");
    process.exit(1);
});

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        const user = await User.find(
            {},
            { name: 1, email: 1, pin: 1, phone: 1, role: 1 }
        )
            .populate("outlet")
            .exec();
        //console.log("PEOPLE ", user);
        response = {
            statusCode: 200,
            body: JSON.stringify(user),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: 400,
            body: JSON.stringify(err)
        };
    }
    return response;
};
