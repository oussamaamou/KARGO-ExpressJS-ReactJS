import { useState, useEffect } from 'react';
import trajetService from '../../services/trajetService';
import Loader from '../../components/common/loader/Loader';

const ChauffeurDashboard = () => {
    const [trajets, setTrajets] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showEndModal, setShowEndModal] = useState(false);
    const [selectedTrajetId, setSelectedTrajetId] = useState(null);
    const [endData, setEndData] = useState({
        kilometrageArrivee: '',
        carburantConsomme: ''
    });

    useEffect(() => {
        fetchMyTrips();
    }, []);

    const fetchMyTrips = async () => {
        try {
            const res = await trajetService.getMyTrajets();
            setTrajets(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleStartMission = async (id) => {
        if (!window.confirm("Confirmer le départ ?")) return;
        try {
            await trajetService.updateStatus(id, 'en_cours');
            fetchMyTrips();
        } catch (error) {
            alert("Erreur lors du démarrage");
        }
    };

    const openEndModal = (id) => {
        setSelectedTrajetId(id);
        setEndData({ kilometrageArrivee: '', carburantConsomme: '' }); // Reset
        setShowEndModal(true);
    };

    const handleSubmitEnd = async (e) => {
        e.preventDefault();
        try {
            await trajetService.updateStatus(selectedTrajetId, 'termine', {
                kilometrageArrivee: Number(endData.kilometrageArrivee),
                carburantConsomme: Number(endData.carburantConsomme)
            });
            setShowEndModal(false);
            fetchMyTrips();
        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de la clôture");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="p-4 max-w-3xl mx-auto pb-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Missions</h1>

            <div className="space-y-4">
                {trajets.map((trajet) => (
                    <div key={trajet._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <div className="bg-indigo-50 p-4 flex justify-between items-center">
                            <span className="font-semibold text-indigo-900">
                                {new Date(trajet.dateDepart).toLocaleDateString()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${trajet.status === 'planifie' ? 'bg-blue-200 text-blue-800' :
                                    trajet.status === 'en_cours' ? 'bg-yellow-200 text-yellow-800' :
                                        'bg-green-200 text-green-800'
                                }`}>
                                {trajet.status}
                            </span>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center mb-4">
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 uppercase">Départ</p>
                                    <p className="font-bold text-gray-800">{trajet.lieuDepart}</p>
                                </div>
                                <div className="text-2xl text-gray-300">➝</div>
                                <div className="flex-1 text-right">
                                    <p className="text-xs text-gray-500 uppercase">Arrivée</p>
                                    <p className="font-bold text-gray-800">{trajet.lieuArrivee}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded mb-4 text-sm text-gray-600">
                                <p>🚛 {trajet.camion?.immatriculation} - {trajet.camion?.marque}</p>
                            </div>

                            {trajet.status === 'planifie' && (
                                <button onClick={() => handleStartMission(trajet._id)}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow hover:bg-indigo-700 transition">
                                    Démarrer
                                </button>
                            )}
                            {trajet.status === 'en_cours' && (
                                <button onClick={() => openEndModal(trajet._id)}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow hover:bg-green-700 transition">
                                    Terminer & Rapport
                                </button>
                            )}
                            {trajet.status === 'termine' && (
                                <div className="text-center text-sm text-gray-500 italic border-t pt-2">
                                    Mission terminée. <br />
                                    Conso: {trajet.carburantConsomme}L | Arrivée: {trajet.kilometrageArrivee}km
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showEndModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end sm:items-center z-50">
                    <div className="bg-white w-full sm:w-96 rounded-t-2xl sm:rounded-xl p-6 shadow-2xl animate-slide-up">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Rapport de Fin</h2>
                        <form onSubmit={handleSubmitEnd}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kilométrage Compteur (Arrivée)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Ex: 154000"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-lg"
                                    value={endData.kilometrageArrivee}
                                    onChange={(e) => setEndData({ ...endData, kilometrageArrivee: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">Doit être supérieur au départ.</p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Carburant Ajouté / Conso (L)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Ex: 450"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-lg"
                                    value={endData.carburantConsomme}
                                    onChange={(e) => setEndData({ ...endData, carburantConsomme: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setShowEndModal(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200">
                                    Annuler
                                </button>
                                <button type="submit"
                                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold shadow hover:bg-green-700">
                                    Valider
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChauffeurDashboard;