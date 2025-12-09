import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

describe('Test de base API', () => {
    it('Devrait retourner 404 pour une route qui n existe pas', async () => {
        const res = await request(app).get('/route-imaginaire');
        expect(res.statusCode).toEqual(404);
    });

    it('Devrait retourner une erreur JSON propre via le middleware', async () => {
        const res = await request(app).get('/test-error');
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message'); 
        expect(res.body.message).toBe("Ceci est un test d'erreur");
    });

})

afterAll(async () => {
    await mongoose.connection.close();
})
