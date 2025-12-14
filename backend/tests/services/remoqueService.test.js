import RemoqueService from '../../src/services/RemoqueService.js';
import Remoque from '../../src/models/Remoque.js';

// 1. On "Mock" le modèle pour ne pas toucher la vraie BDD
jest.mock('../../src/models/Remoque.js');

describe('Service Remoque', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST 1 : CRÉATION 
    describe('createRemoque', () => {
        it('Doit créer un remoque si l\'immatriculation est nouvelle', async () => {
            Remoque.findOne.mockResolvedValue(null);

            const mockRemoque = { _id: '1', immatriculation: 'QAZ4517G12', type: 'frigo' };
            Remoque.create.mockResolvedValue(mockRemoque);

            const result = await RemoqueService.createRemoque({ immatriculation: 'QAZ4517G12', type: 'frigo' });

            expect(Remoque.findOne).toHaveBeenCalled(); 
            expect(Remoque.create).toHaveBeenCalled(); 
            expect(result).toEqual(mockRemoque);      
        });

        it('Doit échouer si l\'immatriculation existe déjà', async () => {
            Remoque.findOne.mockResolvedValue({ _id: '2', immatriculation: 'QAZ4517G12' });

            await expect(RemoqueService.createRemoque({ immatriculation: 'QAZ4517G12' }))
                .rejects
                .toThrow('Une remorque avec cette immatriculation existe déjà');
            
            expect(Remoque.create).not.toHaveBeenCalled();
        });
    });

    // TEST 2 : LECTURE 
    describe('getAllRemoques', () => {
        it('Doit retourner la liste des remoques', async () => {
            const mockList = [
                { immatriculation: 'QAZ4517G79' }, 
                { immatriculation: 'QAZ4517G84' }
            ];
            
            Remoque.find.mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockList)
            });

            const result = await RemoqueService.getAllRemoques();
            expect(result).toEqual(mockList);
        });
    });

    // TEST 3 : SUPPRESSION 
    describe('deleteRemoque', () => {
        it('Doit supprimer le remoque si l\'ID est bon', async () => {
            Remoque.findByIdAndDelete.mockResolvedValue({ _id: '1', immatriculation: 'Supprimé' });

            const result = await RemoqueService.deleteRemoque('1');
            expect(result.immatriculation).toBe('Supprimé');
        });

        it('Doit lancer une erreur si l\'ID est introuvable', async () => {
            Remoque.findByIdAndDelete.mockResolvedValue(null);

            await expect(RemoqueService.deleteRemoque('999'))
                .rejects
                .toThrow('Remorque non trouvée pour suppression');
        });
    });
});