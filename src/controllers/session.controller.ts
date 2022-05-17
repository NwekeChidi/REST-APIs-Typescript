import { Request, Response } from "express";
import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { createSessionInput } from "../schemas/session.schema";

export async function createSessionHandler(req: Request<{}, {}, createSessionInput["body"]>, res: Response) {
    // validate password
    const user = await validatePassword(req.body);
    if (!user) return res.status(401).send({
        status: "failed",
        message: "Invalid email or password"
    });

    // create session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get<string>("accessTokenTTL") }
    );

    // create access token
    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get<string>("refreshTokenTTL") }
    );

    // send response
    res.status(200).send({
        status: "success",
        accessToken, refreshToken
    });
}