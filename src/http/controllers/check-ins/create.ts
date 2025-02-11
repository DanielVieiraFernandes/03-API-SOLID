import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function create(req: FastifyRequest, res: FastifyReply) {

    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    });

    const {gymId} = createCheckInParamsSchema.parse(req.params);
    const {longitude,latitude } = createCheckInBodySchema.parse(req.body);

    try {

        const registerUseCase = MakeCheckInUseCase();

        await registerUseCase.execute({gymId, userId: req.user.sub, userLatitude: latitude, userLongitude: longitude});

    } catch (error) {


        throw error; 
    }

    return res.status(201).send();

}