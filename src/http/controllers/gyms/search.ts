import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(req: FastifyRequest, res: FastifyReply) {

    const searchGymQueryBodySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1),
    });

    const { page, q } = searchGymQueryBodySchema.parse(req.query);

    const registerUseCase = MakeSearchGymsUseCase();

    const { gyms } = await registerUseCase.execute({ page, query: q });

    return res.status(200).send({
        gyms,
    });

}