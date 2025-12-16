import { useState, useEffect } from 'react';
import trajetService from '../../services/trajetService';
import Loader from '../../components/common/loader/Loader';

const ChauffeurDashboard = () => {
    const [trajets, setTrajets] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleStatusChange = async (id, newStatus) => {
        if (!window.confirm(`Voulez-vous vraiment passer ce trajet à "${newStatus}" ?`)) return;

        try {
            await trajetService.updateStatus(id, newStatus);
            fetchMyTrips(); 
        } catch (error) {
            alert("Erreur lors de la mise à jour");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Missions</h1>

            {trajets.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                    Aucune mission assignée pour le moment.
                </div>
            ) : (
                <div className="space-y-4">
                    {trajets.map((trajet) => (
                        <div key={trajet._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">

                            <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center">
                                <span className="font-semibold text-indigo-900">
                                    {new Date(trajet.dateDepart).toLocaleDateString()}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                    trajet.status === 'planifie' ? 'bg-blue-200 text-blue-800' :
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
                                    <div className="text-gray-400 px-2">➝</div>
                                    <div className="flex-1 text-right">
                                        <p className="text-xs text-gray-500 uppercase">Arrivée</p>
                                        <p className="font-bold text-gray-800">{trajet.lieuArrivee}</p>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                                    <p>🚛 <strong>Véhicule :</strong> {trajet.camion?.immatriculation} ({trajet.camion?.marque})</p>
                                    {trajet.remorque && <p>🔗 <strong>Remorque :</strong> {trajet.remorque.type}</p>}
                                </div>

                                <div className="mt-4">
                                    {trajet.status === 'planifie' && (
                                        <button 
                                            onClick={() => handleStatusChange(trajet._id, 'en_cours')}
                                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow hover:bg-indigo-700 transition"
                                        >
                                            Démarrer la Mission
                                        </button>
                                    )}

                                    {trajet.status === 'en_cours' && (
                                        <button 
                                            onClick={() => handleStatusChange(trajet._id, 'termine')}
                                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow hover:bg-green-700 transition"
                                        >
                                            Terminer la Mission
                                        </button>
                                    )}

                                    {trajet.status === 'termine' && (
                                        <button disabled className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-bold cursor-not-allowed">
                                            Mission Clôturée
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChauffeurDashboard;