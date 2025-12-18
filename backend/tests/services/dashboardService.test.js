import DashboardService from '../../src/services/DashboardService.js';
import Camion from '../../src/models/Camion.js';
import Trajet from '../../src/models/Trajet.js';
import MaintenanceRule from '../../src/models/MaintenanceRule.js';

jest.mock('../../src/models/Camion.js');
jest.mock('../../src/models/Trajet.js');
jest.mock('../../src/models/MaintenanceRule.js');

describe('Service Dashboard', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST : CALCUL DES STATISTIQUES
    describe('getStats', () => {
        it('Doit calculer correctement les KPIs et détecter les camions en alerte', async () => {
            MaintenanceRule.findOne.mockResolvedValue({ seuilVidangeKm: 10000 });

            const mockCamions = [
                { _id: 'c1', immatriculation: 'OK-CAMION', marque: 'Volvo', kilometrage: 20000, dernierEntretienKm: 15000 },
                { _id: 'c2', immatriculation: 'KO-CAMION', marque: 'Renault', kilometrage: 50000, dernierEntretienKm: 30000 }
            ];
            Camion.find.mockResolvedValue(mockCamions);

            Trajet.aggregate.mockResolvedValueOnce([{ total: 5000 }]);
            
            const mockStatuts = [
                { _id: 'termine', count: 10 },
                { _id: 'en_cours', count: 2 }
            ];
            Trajet.aggregate.mockResolvedValueOnce(mockStatuts);

            const result = await DashboardService.getStats();

            expect(result.kpis.totalKm).toBe(70000); 
            expect(result.kpis.totalCarburant).toBe(5000);
            expect(result.kpis.nbCamions).toBe(2);
            expect(result.kpis.alertesMaintenance).toBe(1); 

            expect(result.camionsEnMaintenance).toHaveLength(1);
            expect(result.camionsEnMaintenance[0].immatriculation).toBe('KO-CAMION');
            expect(result.camionsEnMaintenance[0].depassement).toBe(10000); 

            expect(result.statutsTrajets).toEqual(mockStatuts);
        });

        it('Doit gérer les valeurs par défaut et les bases vides', async () => {
            MaintenanceRule.findOne.mockResolvedValue(null);
            Camion.find.mockResolvedValue([]);
            Trajet.aggregate.mockResolvedValue([]); 

            const result = await DashboardService.getStats();

            expect(result.kpis.totalKm).toBe(0);
            expect(result.kpis.totalCarburant).toBe(0);
            expect(result.kpis.alertesMaintenance).toBe(0);
            expect(result.camionsEnMaintenance).toEqual([]);
        });
    });
});