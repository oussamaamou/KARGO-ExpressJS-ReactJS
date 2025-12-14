import express from 'express';

import CamionController from '../controllers/CamionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const camionRoutes = express.Router();
camionRoutes.use(authMiddleware.protect);

camionRoutes.route('/camion')
    .get(CamionController.getAllCamions)
    .post(authMiddleware.authorize('admin') ,CamionController.createCamion);

camionRoutes.route('/camion/:id')
    .put(authMiddleware.authorize('admin') ,CamionController.updateCamion)
    .delete(authMiddleware.authorize('admin') ,CamionController.deleteCamion);


export default camionRoutes;