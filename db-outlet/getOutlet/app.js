// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const mongoose = require("mongoose");

const Outlet = require("./schema/outlet");

let response;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
//let response;

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

const connection = mongoose
    .connect(
        "mongodb+srv://dmeals:1234@clusterbebek0-kt7ii.mongodb.net/test?retryWrites=true&w=majority",
        {
            useUnifiedTopology: true,
            dbName: "dailybox",
            useNewUrlParser: true
        }
    )
    .then(() => console.log("CONNECT SUCCESSFULLY TO DATABASE"))
    .catch(() => console.log("CONNECTION TO DATABASE ERROR."));

mongoose.connection.once("open", function() {
    console.log("Mongoose connection in lambda opened");
});

mongoose.connection.on("error", function() {
    console.error("Error creating mongoose connection in lambda, exiting!");
    process.exit(1);
});
exports.lambdaHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        const outlet = await Outlet.find();
        console.log(outlet);
        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(outlet)
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(err)
        };
    }

    return response;
};
