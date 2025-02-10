import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { MakeFetchCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(req: FastifyRequest, res: FastifyReply) {

    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = checkInHistoryQuerySchema.parse(req.query);

    const registerUseCase = MakeFetchCheckInsHistoryUseCase();

    const { checkIns } = await registerUseCase.execute({ page, userId: req.user.sub });

    return res.status(201).send({
        checkIns
    });

}