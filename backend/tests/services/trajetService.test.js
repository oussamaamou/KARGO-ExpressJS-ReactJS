import TrajetService from '../../src/services/TrajetService.js';
import Trajet from '../../src/models/Trajet.js';
import Camion from '../../src/models/Camion.js';

jest.mock('../../src/models/Trajet.js');
jest.mock('../../src/models/Camion.js');

describe('Service Trajet', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST 1 : CRÉATION 
    describe('createTrajet', () => {
        it('Doit créer un trajet si le camion et le chauffeur sont libres', async () => {
            Trajet.findOne.mockResolvedValue(null);
            
            const mockTrajet = { _id: '1', camion: 'C1', chauffeur: 'U1', status: 'planifie' };
            Trajet.create.mockResolvedValue(mockTrajet);
            Camion.findByIdAndUpdate.mockResolvedValue({});

            const result = await TrajetService.createTrajet({ camion: 'C1', chauffeur: 'U1' });

            // Vérifications
            expect(Trajet.findOne).toHaveBeenCalledTimes(2); 
            expect(Trajet.create).toHaveBeenCalled();
            expect(Camion.findByIdAndUpdate).toHaveBeenCalledWith('C1', { status: 'en_mission' });
            expect(result).toEqual(mockTrajet);
        });

        it('Doit échouer si le camion est déjà en mission', async () => {
            Trajet.findOne.mockResolvedValueOnce({ _id: 'existingTrajet' });

            await expect(TrajetService.createTrajet({ camion: 'C1', chauffeur: 'U1' }))
                .rejects
                .toThrow('Ce camion est déjà assigné à une mission en cours ou planifiée.');
            
            expect(Trajet.create).not.toHaveBeenCalled();
        });

        it('Doit échouer si le chauffeur est déjà en mission', async () => {
            Trajet.findOne
                .mockResolvedValueOnce(null) 
                .mockResolvedValueOnce({ _id: 'existingTrajet' });

            await expect(TrajetService.createTrajet({ camion: 'C1', chauffeur: 'U1' }))
                .rejects
                .toThrow('Ce chauffeur est déjà en mission.');
            
            expect(Trajet.create).not.toHaveBeenCalled();
        });
    });

    // TEST 2 : LECTURE GLOBALE 
    describe('getAllTrajets', () => {
        it('Doit retourner tous les trajets avec populate', async () => {
            const mockList = [{ _id: '1' }, { _id: '2' }];
            
            const mockQuery = {
                populate: jest.fn().mockReturnThis(), 
                sort: jest.fn().mockResolvedValue(mockList) 
            };
            
            Trajet.find.mockReturnValue(mockQuery);

            const result = await TrajetService.getAllTrajets();

            expect(Trajet.find).toHaveBeenCalled();
            expect(mockQuery.populate).toHaveBeenCalledTimes(3);
            expect(result).toEqual(mockList);
        });
    });

    // TEST 3 : LECTURE CHAUFFEUR
    describe('getChauffeurTrajets', () => {
        it('Doit retourner les trajets d\'un chauffeur spécifique', async () => {
            const mockList = [{ _id: '10', chauffeur: 'U1' }];

            const mockQuery = {
                populate: jest.fn().mockReturnThis(),
                sort: jest.fn().mockResolvedValue(mockList)
            };

            Trajet.find.mockReturnValue(mockQuery);

            const result = await TrajetService.getChauffeurTrajets('U1');

            expect(Trajet.find).toHaveBeenCalledWith({ chauffeur: 'U1' });
            expect(mockQuery.populate).toHaveBeenCalledTimes(2);
            expect(result).toEqual(mockList);
        });
    });
});