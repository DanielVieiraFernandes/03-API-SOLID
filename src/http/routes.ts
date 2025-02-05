import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";

export async function appRoutes(app: FastifyInstance) {
    // Controller é um nome dado justamente para a função abaixo
    app.post('/users', register)
}
