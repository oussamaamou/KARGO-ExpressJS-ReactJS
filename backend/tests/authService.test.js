import authServices from '../src/services/authServices.js';
import User from "../src/models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// On "Mock" (simule) les dépendances pour ne pas toucher la vraie DB
jest.mock('../src/models/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    //  TEST 1 : INSCRIPTION (REGISTER) 
    describe('registerUser', () => {
        it('Devrait créer un nouvel utilisateur si tout est valide', async () => {
            const userData = { nom: 'Test', email: 'test@test.com', password: 'password123' };

            User.findOne.mockResolvedValue(null);

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');

            User.create.mockResolvedValue({ _id: '123', ...userData, password: 'hashedPassword' });

            const result = await authServices.registerUser(userData);

            expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
            expect(User.create).toHaveBeenCalled();
            expect(result).toHaveProperty('_id', '123');
        });

        it('Devrait lancer une erreur si l\'utilisateur existe déjà', async () => {
            const userData = { email: 'exist@test.com', password: 'password123' };

            User.findOne.mockResolvedValue({ email: 'exist@test.com' });

            await expect(authServices.registerUser(userData))
                .rejects
                .toThrow("Cet utilisateur existe déjà");
        });
    });

    // TEST 2 : CONNEXION (LOGIN)
    describe('loginUser', () => {
        it('Devrait retourner un token si login réussi', async () => {
            const loginData = { email: 'test@test.com', password: 'password123' };
            const mockUser = { _id: '123', email: 'test@test.com', password: 'hashedPassword', role: 'chauffeur' };

            User.findOne.mockResolvedValue(mockUser);

            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('fakeToken123');

            const result = await authServices.loginUser(loginData.email, loginData.password);

            expect(result).toHaveProperty('token', 'fakeToken123');
            expect(result).toHaveProperty('user');
        });

        it('Devrait échouer si mot de passe incorrect', async () => {
            const loginData = { email: 'test@test.com', password: 'wrongPassword' };
            const mockUser = { email: 'test@test.com', password: 'hashedPassword' };

            User.findOne.mockResolvedValue(mockUser);

            bcrypt.compare.mockResolvedValue(false);

            await expect(authServices.loginUser(loginData.email, loginData.password))
                .rejects
                .toThrow("Mot de Passe ou Email incorrecte");
        });
    });
});