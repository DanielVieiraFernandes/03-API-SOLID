import { verifyJWT } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";

export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    
    // Todas as rotas vão chamar esse hook/middleware antes de executar a função

    app.get('/gyms/search', search);
    app.get('/gyms/nearby', nearby);

    app.post('/gyms', create);

}
