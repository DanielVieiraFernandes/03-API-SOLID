import { FastifyReply, FastifyRequest } from "fastify";
import { MakeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metrics(req: FastifyRequest, res: FastifyReply) {

    const registerUseCase = MakeGetUserMetricsUseCase();

    const { checkInsCount } = await registerUseCase.execute({ userId: req.user.sub });

    return res.status(201).send({
        checkInsCount
    });

}