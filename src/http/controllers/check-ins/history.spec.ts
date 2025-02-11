import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Check-in History e2e', () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should be able to list the history of check-ins', async () => {
        const { token } = await createAndAuthenticateUser(app);

        // -22.9076887,-47.1809806

        const user = await prisma.user.findFirstOrThrow();

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -22.9076887,
                longitude: -47.1809806,
            }
        })

        await prisma.checkIn.createMany({
            data: [{
                gym_id: gym.id,
                user_id: user.id
            },
            {
                gym_id: gym.id,
                user_id: user.id
            },]
        })

        const response = await request(app.server).get(`/check-ins/history`).set(`Authorization`, `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(201)
        expect(response.body).toEqual({
            "checkIns":[
                expect.objectContaining({
                    gym_id: gym.id,
                    user_id: user.id
                }),
                expect.objectContaining({
                    gym_id: gym.id,
                    user_id: user.id
                })
            ]
        })

    })
})