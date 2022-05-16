import mongoose from "mongoose";
import config from "config";

function connect() {
    const dbUri = config.get<string>("dbUrl");
    return mongoose.connect(dbUri)
        .then(() => {
            console.log(":>>>>>>>>>> DB Connection Successful.");
        })
        .catch((error) => {
            console.error(":<<<<<<<<<< DB Connection Failed.");
            process.exit(1);
        })
}

export default connect;