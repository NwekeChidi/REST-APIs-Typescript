// import dependecies
import express from "express";
import config from "config";
import connect from "./utils/connectDB";

const app = express();
const port = config.get<number>('port');

app.listen(port, () => {
    connect();
    console.log(":>>>>>>>>>> App is running.");
})