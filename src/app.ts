import fastify from "fastify";
import { userRoutes } from "./http/controllers/users/routes";
import { gymRoutes } from "./http/controllers/gyms/routes copy";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, res) => {
    if(error instanceof ZodError){
        return res.status(400).send({
            message: 'validation error',
            issues: error.format()
        })
    }

    if(env.NODE_ENV !== "production"){
        console.error(error);
    } else {
        // TODO Here we should log to an external tool
    }

    return res.status(500).send({
        message: 'Internal server error'
    })
})


// ORM - Object Relational Mapper
