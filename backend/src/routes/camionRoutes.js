import express from 'express';

import CamionController from '../controllers/CamionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const camionRouter = express.Router();
camionRouter.use(authMiddleware.protect);

camionRouter.route('/camion')
    .get(CamionController.getAllCamions)
    .post(authMiddleware.authorize('admin') ,CamionController.createCamion);

camionRouter.route('/camion/:id')
    .put(authMiddleware.authorize('admin') ,CamionController.updateCamion)
    .delete(authMiddleware.authorize('admin') ,CamionController.deleteCamion);


export default camionRouter;