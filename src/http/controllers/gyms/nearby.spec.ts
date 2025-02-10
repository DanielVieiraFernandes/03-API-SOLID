import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Nearby Gyms e2e', () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should be able to list nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app);

        // -22.9076887,-47.1809806

        // await gymsRepository.create({
        //     title: 'Near Gym',
        //     latitude: -22.8966877,
        //     longitude: -47.1654605,
        //     description: null,
        //     phone: null,
        // });
        // await gymsRepository.create({
        //     title: 'Far Gym',
        //     latitude: -23.889312,
        //     longitude: -46.1703036,
        //     description: null,
        //     phone: null,
        // });

        await request(app.server).post('/gyms').set(`Authorization`, `Bearer ${token}`).send({
            title: 'Javascript Gym',
            description: 'Some Description',
            phone: '1199999999',
            latitude: -22.8966877,
            longitude: -47.1654605,
        })

        await request(app.server).post('/gyms').set(`Authorization`, `Bearer ${token}`).send({
            title: 'Typescript Gym',
            description: 'Some Description',
            phone: '1199999999',
            latitude: -23.889312,
            longitude: -46.1703036,
        })

        const response = await request(app.server).get('/gyms/nearby').query({
            latitude: -22.8966877,
            longitude: -47.1654605,
        }).set(`Authorization`, `Bearer ${token}`).send()


        expect(response.statusCode).toEqual(201)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Javascript Gym'
            })
        ])

    })
})