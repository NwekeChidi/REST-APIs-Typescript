import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

function connect() {
    const dbUri = config.get<string>("dbUrl");
    return mongoose.connect(dbUri)
        .then(() => {
            logger.info(":>>>>>>>>>> DB Connection Successful.");
        })
        .catch((error) => {
            logger.error(":<<<<<<<<<< DB Connection Failed.");
            process.exit(1);
        })
}

export default connect;