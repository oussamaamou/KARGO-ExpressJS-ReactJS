import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

import AdminLayout from '../layouts/AdminLayout';
import ChauffeurLayout from '../layouts/ChauffeurLayout';

import LoginPage from '../pages/Login';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ChauffeurDashboard from '../pages/chauffeur/ChauffeurDashboard';
import Page404 from '../pages/Page404';
import Camions from '../pages/admin/Camions';
import Remoques from '../pages/admin/Remoques';
import MaintenanceRules from '../pages/admin/MaintenanceRules';

const AppRoutes = () => {
    return (

        <Routes>
            {/* Routes Publiques*/}
            <Route path='/' element={<Navigate to="/login" replace />} />
            <Route path='/login' element={<LoginPage />} />

            {/* Routes Admin */}
            <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
                <Route path="admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="camions" element={<Camions />}/>
                    <Route path='remoques' element={<Remoques />} />
                    <Route path='maintenance' element={<MaintenanceRules />} />
                </Route>
            </Route>

            {/* Routes Chauffeur */}
            <Route element={<ProtectedRoutes allowedRoles={['chauffeur']} />}>
                <Route path='chauffeur' element={<ChauffeurLayout />}>
                    <Route path='mes-trajets' element={<ChauffeurDashboard />} />
                </Route>
            </Route>

            {/* Route 404 */}
            <Route path='*' element={<Page404 />} />

        </Routes>
    )
}

export default AppRoutes;