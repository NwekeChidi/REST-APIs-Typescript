import User from "../models/user.model";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../services/user.service";
import { createUserInput } from "../schemas/user.schema";
import { omit } from "lodash";

export async function createUserHandlder(req: Request<{}, {}, createUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        res.status(201).send({
            status: "success",
            user: omit(user.toJSON(), "password", "__v")
        });
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}