import { useState, useEffect } from 'react';
import trajetService from '../../services/trajetService';
import camionService from '../../services/camionService';
import remoqueService from '../../services/remoqueService';
import authService from '../../services/authService';
import Loader from '../../components/common/loader/Loader';

const Trajets = () => {
    const [trajets, setTrajets] = useState([]);
    
    const [chauffeurs, setChauffeurs] = useState([]);
    const [camions, setCamions] = useState([]);
    const [remoques, setRemoques] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        chauffeur: '',
        camion: '',
        remorque: '', 
        lieuDepart: '',
        lieuArrivee: '',
        dateDepart: '',
        dateArriveePrevue: ''
    });

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        try {
            const [trajetsRes, chauffeursRes, camionsRes, remoquesRes] = await Promise.all([
                trajetService.getAllTrajets(),
                authService.getChauffeurs(),
                camionService.getAllCamions(),
                remoqueService.getAllRemoques()
            ]);

            setTrajets(trajetsRes.data);
            setChauffeurs(chauffeursRes.data);
            setCamions(camionsRes.data);
            setRemoques(remoquesRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Erreur chargement données", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await trajetService.createTrajet(formData);
            setShowModal(false);
            setFormData({
                chauffeur: '', camion: '', remorque: '',
                lieuDepart: '', lieuArrivee: '',
                dateDepart: '', dateArriveePrevue: ''
            });

            const res = await trajetService.getAllTrajets();
            setTrajets(res.data);
        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de la création du trajet");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Trajets</h1>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Nouveau Trajet
                </button>
            </div>

            {loading ? <Loader /> : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Départ / Arrivée</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chauffeur</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Véhicule</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {trajets.map((trajet) => (
                                <tr key={trajet._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{trajet.lieuDepart}</div>
                                        <div className="text-sm text-gray-500">vers {trajet.lieuArrivee}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(trajet.dateDepart).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {trajet.chauffeur?.nom || 'Inconnu'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {trajet.camion?.immatriculation} 
                                        {trajet.remorque ? ` + ${trajet.remorque.type}` : ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            trajet.status === 'planifie' ? 'bg-blue-100 text-blue-800' :
                                            trajet.status === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {trajet.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">Assigner une Mission</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lieu de Départ</label>
                                    <input type="text" required className="mt-1 block w-full border p-2 rounded-md"
                                        value={formData.lieuDepart}
                                        onChange={(e) => setFormData({...formData, lieuDepart: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lieu d'Arrivée</label>
                                    <input type="text" required className="mt-1 block w-full border p-2 rounded-md"
                                        value={formData.lieuArrivee}
                                        onChange={(e) => setFormData({...formData, lieuArrivee: e.target.value})} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date Départ</label>
                                    <input type="date" required className="mt-1 block w-full border p-2 rounded-md"
                                        value={formData.dateDepart}
                                        onChange={(e) => setFormData({...formData, dateDepart: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date Arrivée Prévue</label>
                                    <input type="date" required className="mt-1 block w-full border p-2 rounded-md"
                                        value={formData.dateArriveePrevue}
                                        onChange={(e) => setFormData({...formData, dateArriveePrevue: e.target.value})} />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Chauffeur</label>
                                <select required className="mt-1 block w-full border p-2 rounded-md bg-white"
                                    value={formData.chauffeur}
                                    onChange={(e) => setFormData({...formData, chauffeur: e.target.value})}>
                                    <option value="">-- Sélectionner un chauffeur --</option>
                                    {chauffeurs.map(c => (
                                        <option key={c._id} value={c._id}>{c.nom} {c.prenom} ({c.email})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Camion</label>
                                    <select required className="mt-1 block w-full border p-2 rounded-md bg-white"
                                        value={formData.camion}
                                        onChange={(e) => setFormData({...formData, camion: e.target.value})}>
                                        <option value="">-- Sélectionner un camion --</option>
                                        {camions
                                            .filter(camion => camion.status === 'disponible')
                                            .map(camion => (
                                            <option key={camion._id} value={camion._id}>
                                                {camion.immatriculation} - {camion.marque} ({camion.status})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sélectionner une Remorque</label>
                                    <select className="mt-1 block w-full border p-2 rounded-md bg-white"
                                        value={formData.remorque}
                                        onChange={(e) => setFormData({...formData, remorque: e.target.value})}>
                                        <option value="">-- Sélectionner une remoque --</option>
                                        {remoques
                                            .filter(remoque => remoque.status === 'disponible')
                                            .map(remoque => (
                                            <option key={remoque._id} value={remoque._id}>
                                                {remoque.type} - {remoque.immatriculation} ({remoque.status})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                                    Annuler
                                </button>
                                <button type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                    Assigner la Mission
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trajets;