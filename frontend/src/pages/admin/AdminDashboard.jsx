import { useState, useEffect } from 'react';
import api from '../../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/stats');
                setStats(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-6">Calcul des statistiques...</div>;

    const dataGraph = stats.statutsTrajets.map(item => ({
        name: item._id.charAt(0).toUpperCase() + item._id.slice(1), 
        value: item.count
    }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                    <p className="text-gray-500 text-sm">Flotte Totale</p>
                    <p className="text-2xl font-bold">{stats.kpis.nbCamions} Camions</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <p className="text-gray-500 text-sm">Kilométrage Global</p>
                    <p className="text-2xl font-bold">{stats.kpis.totalKm.toLocaleString()} km</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <p className="text-gray-500 text-sm">Carburant Consommé</p>
                    <p className="text-2xl font-bold">{stats.kpis.totalCarburant.toLocaleString()} L</p>
                </div>

                <div className={`p-6 rounded-lg shadow border-l-4 ${stats.kpis.alertesMaintenance > 0 ? 'bg-red-50 border-red-500' : 'bg-white border-gray-300'}`}>
                    <p className="text-gray-500 text-sm">Alertes Maintenance</p>
                    <p className={`text-2xl font-bold ${stats.kpis.alertesMaintenance > 0 ? 'text-red-600' : 'text-gray-800'}`}>
                        {stats.kpis.alertesMaintenance} Véhicules
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        Maintenance Requise
                    </h2>
                    {stats.camionsEnMaintenance.length === 0 ? (
                        <p className="text-green-600 bg-green-50 p-3 rounded">Tout est en ordre !</p>
                    ) : (
                        <div className="space-y-3">
                            {stats.camionsEnMaintenance.map(c => (
                                <div key={c._id} className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded">
                                    <div>
                                        <p className="font-bold text-gray-800">{c.immatriculation}</p>
                                        <p className="text-sm text-gray-600">{c.marque}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                            + {c.depassement} km
                                        </span>
                                        <p className="text-xs text-red-500 mt-1">Seuil dépassé</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-4">État des Missions</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dataGraph}
                                    cx="50%" cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataGraph.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;