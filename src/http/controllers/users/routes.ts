import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function userRoutes(app: FastifyInstance) {
    // Controller é um nome dado justamente para a função abaixo
    app.post('/users', register);
    app.post('/sessions', authenticate);

    app.patch('/token/refresh', refresh);
    // Authenticated
    app.get('/me', {
        onRequest: [verifyJWT]
    } ,profile);
}
