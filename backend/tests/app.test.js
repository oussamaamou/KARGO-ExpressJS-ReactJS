import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

describe('Test de base API', () => {
    it('Devrait retourner 404 pour une route qui n existe pas', async () => {
        const res = await request(app).get('/route-imaginaire');
        expect(res.statusCode).toEqual(404);
    });

})

afterAll(async () => {
    await mongoose.connection.close();
})
