import { useState, useEffect } from 'react';
import trajetService from '../../services/trajetService';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../components/common/loader/Loader';

const ChauffeurDashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        termines: 0,
        enCours: 0,
        aFaire: 0,
        totalCarburant: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        calculateStats();
    }, []);

    const calculateStats = async () => {
        try {
            const res = await trajetService.getMyTrajets();
            const trajets = res.data;

            const total = trajets.length;
            const termines = trajets.filter(t => t.status === 'termine').length;
            const enCours = trajets.filter(t => t.status === 'en_cours').length;
            const aFaire = trajets.filter(t => t.status === 'planifie').length;

            const totalCarburant = trajets.reduce((acc, curr) => acc + (curr.carburantConsomme || 0), 0);

            setStats({
                total,
                termines,
                enCours,
                aFaire,
                totalCarburant
            });
            setLoading(false);

        } catch (error) {
            console.error("Erreur calcul stats", error);
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    const dataGraph = [
        { name: 'À faire', value: stats.aFaire },
        { name: 'En cours', value: stats.enCours },
        { name: 'Terminé', value: stats.termines },
    ];
    const COLORS = ['#3B82F6', '#EAB308', '#22C55E']; 

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Mon Tableau de Bord</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <p className="text-gray-500 text-sm font-medium">Missions Totales</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.total}</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <p className="text-gray-500 text-sm font-medium">Missions Terminées</p>
                    <div className="flex items-end gap-2 mt-2">
                        <p className="text-3xl font-bold text-green-600">{stats.termines}</p>
                        <span className="text-xs text-gray-400 mb-1">
                            ({Math.round((stats.termines / (stats.total || 1)) * 100)}%)
                        </span>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <p className="text-gray-500 text-sm font-medium">En Cours / À faire</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats.enCours + stats.aFaire}</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <p className="text-gray-500 text-sm font-medium">Carburant Total</p>
                    <p className="text-3xl font-bold text-gray-700 mt-2">{stats.totalCarburant} <span className="text-sm font-normal"></span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Répartition de mes missions</h3>
                    
                    {stats.total === 0 ? (
                        <div className="h-64 flex items-center justify-center text-gray-400">
                            Aucune donnée disponible
                        </div>
                    ) : (
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
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-6 rounded-lg shadow-md text-white">
                    <h3 className="text-lg font-bold mb-2">Bienvenue sur votre espace !</h3>
                    <p className="opacity-90 mb-4">
                        Vous pouvez consulter l'historique complet de vos trajets, télécharger vos ordres de mission et mettre à jour vos rapports d'activité directement depuis l'onglet "Mes Trajets".
                    </p>
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                        <p className="text-sm font-medium">Conseil du jour :</p>
                        <p className="text-xs mt-1 italic">
                            "N'oubliez pas de vérifier la pression des pneus avant chaque départ pour optimiser la consommation de carburant."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChauffeurDashboard;