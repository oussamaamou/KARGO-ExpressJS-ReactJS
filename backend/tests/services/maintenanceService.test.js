import MaintenanceService from '../../src/services/MaintenanceService.js';
import MaintenanceRule from '../../src/models/MaintenanceRule.js';

jest.mock('../../src/models/MaintenanceRule.js');

describe('Service Maintenance', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST 1 : LECTURE (getRules)
    describe('getRules', () => {
        it('Doit retourner les règles existantes si elles sont trouvées', async () => {
            const mockRules = { _id: '1', type: 'global', seuilVidangeKm: 15000 };
            
            // On simule qu'on trouve un document
            MaintenanceRule.findOne.mockResolvedValue(mockRules);

            const result = await MaintenanceService.getRules();

            expect(MaintenanceRule.findOne).toHaveBeenCalledWith({ type: 'global' });
            expect(MaintenanceRule.create).not.toHaveBeenCalled(); // On ne doit pas créer si ça existe
            expect(result).toEqual(mockRules);
        });

        it('Doit créer et retourner des règles par défaut si aucune n\'existe', async () => {
            // On simule qu'on ne trouve rien (null)
            MaintenanceRule.findOne.mockResolvedValue(null);
            
            const newRules = { _id: '2', type: 'global' };
            MaintenanceRule.create.mockResolvedValue(newRules);

            const result = await MaintenanceService.getRules();

            expect(MaintenanceRule.findOne).toHaveBeenCalled();
            expect(MaintenanceRule.create).toHaveBeenCalledWith({ type: 'global' });
            expect(result).toEqual(newRules);
        });
    });

    // TEST 2 : MISE À JOUR (updateRules)
    describe('updateRules', () => {
        it('Doit mettre à jour les seuils (vidange/pneus)', async () => {
            const dataToUpdate = { seuilVidangeKm: 20000, seuilPneusKm: 50000 };
            const updatedRules = { _id: '1', type: 'global', ...dataToUpdate };

            MaintenanceRule.findOneAndUpdate.mockResolvedValue(updatedRules);

            const result = await MaintenanceService.updateRules(dataToUpdate);

            expect(MaintenanceRule.findOneAndUpdate).toHaveBeenCalledWith(
                { type: 'global' },
                { 
                    seuilVidangeKm: dataToUpdate.seuilVidangeKm,
                    seuilPneusKm: dataToUpdate.seuilPneusKm
                },
                { new: true, upsert: true }
            );
            expect(result).toEqual(updatedRules);
        });
    });
});