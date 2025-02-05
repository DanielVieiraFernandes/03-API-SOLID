import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

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
