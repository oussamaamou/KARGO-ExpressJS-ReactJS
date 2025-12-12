import express from 'express';

import CamionController from '../controllers/CamionController';
import {protect, authorize} from '../middlewares/authMiddleware';

const camionRoutes = express.Router();
camionRoutes.use(protect);

camionRoutes.route('/camion')
    .get(CamionController.getAllCamions)
    .post(authorize('admin') ,CamionController.createCamion);

camionRoutes.route('/camion/:id')
    .put(CamionController.updateCamion)
    .delete(authorize('admin') ,CamionController.deleteCamion);


export default camionRoutes;