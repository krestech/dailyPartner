// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const mongoose = require("mongoose");
const User = require("./schema/user");
const bcrypt = require("bcrypt-nodejs");
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
exports.lambdaHandler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        const user = new User();
        let body = JSON.parse(event.body);
        user.name = body.name;
        user.userName = body.userName;
        user.email = body.email;
        user.password = bcrypt.hashSync(body.password);
        user.pin = bcrypt.hashSync(body.pin);
        user.phone = body.phone;
        user.role = body.role;
        user.outlet = body.outlet;

        user.save(function(err) {
            // console.log("eventttttt", body);
            // if (err)
            //     res.json(err);
            response = callback(null, {
                statusCode: 200,
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Request-Method": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Credentials": true
                }
            });
        });
    } catch (err) {
        //console.log(err);
        callback(null, response);
        return err;
    }

    return response;
};
