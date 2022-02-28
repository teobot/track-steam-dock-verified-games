import express from "express";
import config from "./config/config";
import connectToDatabase from "./config/db"
import MainController from "./controllers/test.controller";

const app = express();

const port = process.env.PORT || 3333;

app.get('/', async (req, res) => {

    const controller = new MainController();

    let githubData = await controller.getStoredData();

    const currentProtonData = await controller.getCurrentData();

    githubData.push(currentProtonData);

    await controller.saveData(githubData);

    res.send(githubData);
})

app.listen(port, function () {
    console.log(`Connect Via : http://localhost:${port}/`);
});