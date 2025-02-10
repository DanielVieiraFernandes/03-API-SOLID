import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(req: FastifyRequest, res: FastifyReply) {

    const nearbyGymsQueryBodySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    });

    const { latitude,longitude } = nearbyGymsQueryBodySchema.parse(req.query);

    const registerUseCase = MakeFetchNearbyGymsUseCase();

    const { gyms } = await registerUseCase.execute({ userLatitude: latitude, userLongitude: longitude });

    return res.status(201).send({
        gyms,
    });

}