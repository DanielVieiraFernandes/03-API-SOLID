import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { MakeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { MakeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validate(req: FastifyRequest, res: FastifyReply) {

    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })



    const { checkInId } = validateCheckInParamsSchema.parse(req.params);


    const validateCheckInUseCase = MakeValidateCheckInUseCase();

    await validateCheckInUseCase.execute({ checkInId });


    return res.status(204).send();

}