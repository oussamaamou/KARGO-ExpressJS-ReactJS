import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout';
import ChauffeurLayout from '../layouts/ChauffeurLayout';

import LoginPage from '../pages/Login';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ChauffeurDashboard from '../pages/chauffeur/ChauffeurDashboard';
import Page404 from '../pages/Page404';

const AppRoutes = () => {
    return (

        <Routes>
            {/* Routes Publiques*/}
            <Route path='/' element={<Navigate to="/login" replace />} />
            <Route path='/login' element={<LoginPage />} />

            {/* Routes Admin */}
            <Route path="admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Routes Chauffeur */}
            <Route path='chauffeur' element={<ChauffeurLayout />}>
                <Route path='mes-trajets' element={<ChauffeurDashboard />} />
            </Route>

            {/* Route 404 */}
            <Route path='*' element={<Page404 />} />

        </Routes>
    )
}

export default AppRoutes;