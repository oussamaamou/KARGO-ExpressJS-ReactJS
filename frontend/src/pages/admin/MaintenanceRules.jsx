import { useState, useEffect } from 'react';
import api from '../../services/api';

import Loader from '../../components/common/loader/Loader';

const MaintenanceRules = () => {
    const [rules, setRules] = useState({ seuilVidangeKm: "", seuilPneusKm: "" });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // Charger les règles actuelles
    useEffect(() => {
        const fetchRules = async () => {
            try {
                const res = await api.get('/maintenance/rules');
                setRules(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchRules();
    }, []);

    // Sauvegarder
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await api.put('/maintenance/rules', rules);
            setMessage("Règles mises à jour avec succès !");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de la mise à jour");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuration de la Maintenance</h1>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                {message && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fréquence des Vidanges (km)
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                            Une alerte sera levée si (Km Actuel - Km Dernière Vidange) dépasse ce seuil.
                        </p>
                        <input
                            type="number"
                            className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                            value={rules.seuilVidangeKm}
                            onChange={(e) => setRules({ ...rules, seuilVidangeKm: Number(e.target.value) })}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Durée de vie estimée des Pneus (km)
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                            value={rules.seuilPneusKm}
                            onChange={(e) => setRules({ ...rules, seuilPneusKm: Number(e.target.value) })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
                    >
                        Enregistrer les règles
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MaintenanceRules;