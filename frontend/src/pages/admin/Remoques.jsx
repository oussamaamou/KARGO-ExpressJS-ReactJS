import {useState, useEffect } from "react";
import remoqueService from "../../services/remoqueService";
import Loader from "../../components/common/loader/Loader";

const Remoques = () => {
    const [remoques, setRemoques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        immatriculation: "",
        type: "",
        capacite: "",
        status: "",
    });

    useEffect(() => {
        fetchRemoques();

    }, [])

    const fetchRemoques = async() => {
        try{
            const response = await remoqueService.getAllRemoques();
            setRemoques(response.data);
            setLoading(false);

        } catch(error){
            console.error('Erreur de chargement', error);
            setLoading(false);

        }
    }

    const handleDelete = async(id) => {
        try{
            await remoqueService.deleteRemoque(id);
            fetchRemoques();

        } catch(error){
            alert(error.response?.data?.message || "Erreur lors de la suppression");

        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await remoqueService.createRemoque(formData);
            setShowModal(false);
            setFormData({
                immatriculation: "",
                type: "",
                capacite: "",
                status: "",
            });
            fetchRemoques();

        } catch(error){
            alert(error.response?.data?.message || "Erreur lors de la création");
        }
    }

    return(
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Remoques</h1>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Ajouter un Remoque
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Immatriculation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacité</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {remoques.map((remoque) => (
                                <tr key={remoque._id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{remoque.immatriculation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{remoque.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{remoque.capacite} km</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            remoque.status === 'disponible' ? 'bg-green-100 text-green-800' : 
                                            remoque.status === 'maintenance' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {remoque.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleDelete(remoque._id)}
                                            className="text-red-600 hover:text-red-900 ml-4"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-xl font-bold mb-4">Nouveau Remoque</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Immatriculation</label>
                                <input 
                                    type="text" 
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    value={formData.immatriculation}
                                    onChange={(e) => setFormData({...formData, immatriculation: e.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2.5 text-sm font-medium text-heading">Type du Remoque</label>
                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 outline-none cursor-pointer"
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                >
                                    <option value="frigo">Frigo</option>
                                    <option value="bache">Bache</option>
                                    <option value="plateau">Plateau</option>
                                    <option value="citerne">Citerne</option>
                                </select>
                            </div>
                            <div className='mb-4'>
                                <label className="block text-sm font-medium text-gray-700">Capacité</label>
                                <input 
                                    type="number" 
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                    value={formData.capacite}
                                    onChange={(e) => setFormData({...formData, capacite: Number(e.target.value)})}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2.5 text-sm font-medium text-heading">Statut du Remoque</label>
                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 outline-none cursor-pointer"
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="disponible">Disponible</option>
                                    <option value="en_mission">En mission</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )

}

export default Remoques;