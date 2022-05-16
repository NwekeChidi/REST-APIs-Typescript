// import dependecies
import express from "express";
import config from "config";
import connect from "./utils/connectDB";
import logger from "./utils/logger";

const app = express();
const port = config.get<number>('port');

app.listen(port, () => {
    connect();
    logger.info(":>>>>>>>>>> App is running.");
})