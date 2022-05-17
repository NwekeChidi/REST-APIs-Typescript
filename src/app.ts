// import dependecies
import express from "express";
import config from "config";
import connect from "./utils/connectDB";
import logger from "./utils/logger";
import routes from "./routes";

const app = express();

app.use(express.json());

const port = config.get<number>('port');

app.listen(port, () => {
    connect();
    routes(app);
    logger.info(`:>>>>>>>>>> App is running on port ${port}.`);
})