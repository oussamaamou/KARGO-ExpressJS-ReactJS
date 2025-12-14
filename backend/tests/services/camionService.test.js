import camionService from '../../src/services/CamionService.js';
import Camion from '../../src/models/Camion.js';

// 1. On "Mock" le modèle pour ne pas toucher la vraie BDD
jest.mock('../../src/models/Camion.js');

describe('Service Camion', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST 1 : CRÉATION 
    describe('createCamion', () => {
        it('Doit créer un camion si l\'immatriculation est nouvelle', async () => {
            Camion.findOne.mockResolvedValue(null);

            const mockCamion = { _id: '1', immatriculation: 'QAZ4517G46', marque: 'Volvo' };
            Camion.create.mockResolvedValue(mockCamion);

            const result = await camionService.createCamion({ immatriculation: 'QAZ4517G46', marque: 'Volvo' });

            expect(Camion.findOne).toHaveBeenCalled(); 
            expect(Camion.create).toHaveBeenCalled(); 
            expect(result).toEqual(mockCamion);      
        });

        it('Doit échouer si l\'immatriculation existe déjà', async () => {
            Camion.findOne.mockResolvedValue({ _id: '2', immatriculation: 'QAZ4517G46' });

            await expect(camionService.createCamion({ immatriculation: 'QAZ4517G46' }))
                .rejects
                .toThrow('Un camion avec cette immatriculation déjà exist');
            
            expect(Camion.create).not.toHaveBeenCalled();
        });
    });

    // TEST 2 : LECTURE 
    describe('getAllCamions', () => {
        it('Doit retourner la liste des camions', async () => {
            const mockList = [
                { immatriculation: 'QAZ4517M12' }, 
                { immatriculation: 'QAZ4517N12' }
            ];
            
            Camion.find.mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockList)
            });

            const result = await camionService.getAllCamions();
            expect(result).toEqual(mockList);
        });
    });

    // TEST 3 : SUPPRESSION 
    describe('deleteCamion', () => {
        it('Doit supprimer le camion si l\'ID est bon', async () => {
            Camion.findByIdAndDelete.mockResolvedValue({ _id: '1', immatriculation: 'Supprimé' });

            const result = await camionService.deleteCamion('1');
            expect(result.immatriculation).toBe('Supprimé');
        });

        it('Doit lancer une erreur si l\'ID est introuvable', async () => {
            Camion.findByIdAndDelete.mockResolvedValue(null);

            await expect(camionService.deleteCamion('999'))
                .rejects
                .toThrow('Camion non trouvé pour suppression');
        });
    });
});