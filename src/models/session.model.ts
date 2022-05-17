import mongoose from "mongoose";
import { UserDocument } from "./user.model";


// typescript definition for schema
export interface UserInput {
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string
}

export interface SchemaDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    valid: {
        type: String,
        default: true
    },
    userAgent: String
},
{
    timestamps: true,
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;