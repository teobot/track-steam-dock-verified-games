import axios from "axios";

import { Octokit } from "@octokit/core";

import config from "../config/config";

export default class MainController {
    async saveData(currentData: {}) {
        // save the data to the github gist
        const { token, gist_id } = config.get("github");

        const octokit = new Octokit({
            auth: token,
        });
        const olk = await octokit.request(`PATCH /gists/${gist_id}`, {
            gist_id: gist_id,
            files: {
                "protonSaves.json": {
                    content: JSON.stringify({ saves: currentData }),
                },
            },
        });
    }

    async getCurrentData() {
        // fetch the data from the proton db
        // https://www.protondb.com/data/counts.json
        try {
            const res = await axios.get('https://www.protondb.com/data/counts.json');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }


    async getStoredData() {
        // fetch the array from the github gist
        try {
            const res = await axios.get("https://gist.githubusercontent.com/teobot/4c7c2c3d620ba53e0c925d732db2c7ea/raw");
            return res.data.saves;
        } catch (error) {
            console.log(error);
        }
    }

}