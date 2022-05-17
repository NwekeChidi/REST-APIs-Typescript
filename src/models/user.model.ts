import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";


// typescript definition for schema
export interface UserInput {
    email: string;
    name: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(pwd: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

// Add PreSave hook
userSchema.pre("save", async function(next){
    let user = this as UserDocument;

    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(config.get<number>("salt"));
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
});

// Instance methods
userSchema.methods.comparePassword = async function(pwd: string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(pwd, user.password)
        .catch((e) => false);
}

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;