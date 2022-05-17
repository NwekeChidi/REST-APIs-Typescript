import { Express, Request, Response } from "express";
import { createUserHandlder } from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schemas/user.schema";

function routes(app: Express) {
    app.get('/health', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    // create user
    app.post('/api/users',validateResource(createUserSchema), createUserHandlder)
}

export default routes;