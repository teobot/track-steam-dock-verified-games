import express from "express";
import config from "./config/config";
import connectToDatabase from "./config/db"

const version = config.get("version");

const app = express();

connectToDatabase(function (err: any) {
    if (err) {
        console.log("Unable to connect to MongoDB");
        process.exit(1);
    } else {
        const port = process.env.PORT || 3333;
        app.listen(port, function () {
            console.log(`API Ver: ${version}; Listening on port: ${port}`);
            console.log(`Connect Via : http://localhost:${port}/api/${version}`);
        });
    }
});