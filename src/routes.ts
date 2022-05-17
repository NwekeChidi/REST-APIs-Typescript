import { Express, Request, Response } from "express";
import { createSessionHandler } from "./controllers/session.controller";
import { createUserHandlder } from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schemas/session.schema";
import { createUserSchema } from "./schemas/user.schema";

function routes(app: Express) {
    app.get('/health', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    // create user
    app.post('/api/users', validateResource(createUserSchema), createUserHandlder);

    // create session
    app.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler);
}

export default routes;