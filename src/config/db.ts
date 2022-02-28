// model imports
require("../models/test.model")

// Require mongoose
import mongoose from "mongoose";

// Get config environment variables
import config from "./config";

const connectToDatabase = (callback: any) => {
    try {
        const db = config.get("db");

        // Connecting to mongoDB
        const MongoUri = `mongodb+srv://${db.username}:${db.password}@cluster0.yz6uj.mongodb.net/${db.database}?retryWrites=true&w=majority`;

        console.log({ MongoUri });


        mongoose.connect(MongoUri);

        mongoose.connection.on("connected", () => {
            console.log("Connected to mongo instance");
        });

        callback();

    } catch (error) {
        callback(error);
    }
}

export default connectToDatabase