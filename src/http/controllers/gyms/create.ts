import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { MakeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { MakeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(req: FastifyRequest, res: FastifyReply) {

    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    });

    const { title, description, latitude, longitude, phone } = createGymBodySchema.parse(req.body);

    try {

        const registerUseCase = MakeCreateGymUseCase();

        await registerUseCase.execute({title,phone,longitude,latitude,description});

    } catch (error) {

        throw error; // deixe que uma camâda acima trate esse erro
    }

    return res.status(201).send();

}