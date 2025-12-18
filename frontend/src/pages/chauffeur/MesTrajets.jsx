import { useState, useEffect } from 'react';
import trajetService from '../../services/trajetService';
import Loader from '../../components/common/loader/Loader';
import { generateOrdreMission } from '../../utils/pdfGenerator';

const MesTrajets = () => {
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
                                <div className="flex-1 text-right">
                                    <p className="text-xs text-gray-500 uppercase">Arrivée</p>
                                    <p className="font-bold text-gray-800">{trajet.lieuArrivee}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded mb-4 text-sm text-gray-600">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                        <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z">
                                        </path>
                                    </svg>
                                    {trajet.camion?.immatriculation} - {trajet.camion?.marque}
                                </p>
                            </div>

                            {(trajet.status === 'planifie' || trajet.status === 'en_cours') && (
                                <button
                                    onClick={() => generateOrdreMission(trajet)}
                                    className="w-full mb-2 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold border border-gray-300 hover:bg-gray-200 transition flex justify-center items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Télécharger Ordre de Mission
                                </button>
                            )}

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

export default MesTrajets;