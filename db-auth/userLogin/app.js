// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const mongoose = require("mongoose");
const People = require("./schema/people");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const Outlet = require("./schema/outlet");
const SECRET_KEY = "dailyboxkey";
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
        if (event.body) {
            const body = JSON.parse(event.body);
            const email = body.email;
            const password = body.password;
            const people = await People.find({ email: email })
                .populate("outlet")
                .exec();
            const data = people;
            const verified = false;
            const pass = "";

            if (people.lenght != 0) {
                const pass = bcrypt.compareSync(password, people[0].password);
            }
            if (pass) {
            }

            if (verified === true) {
                console.log("sukses");

                const accessToken = jwt.sign({ id: people[0]._id }, SECRET_KEY);
                response = {
                    statusCode: 200,
                    body: JSON.stringify(people),
                    token: accessToken,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Request-Method": "*",
                        "Access-Control-Allow-Headers": "Authorization",
                        "Access-Control-Allow-Credentials": true
                    }
                };
            }
        }
    } catch (err) {
        //console.log(err);
        callback(null, response);
        return err;
    }

    return response;
};
