import express from 'express';

import RemoqueController from '../controllers/RemoqueController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const remoqueRoutes = express.Router();

remoqueRoutes.use(authMiddleware.protect);

remoqueRoutes.route('/remoque')
    .get(RemoqueController.getAllRemoques)
    .post(authMiddleware.authorize('admin'), RemoqueController.createRemoque);

remoqueRoutes.route('/remoque/:id')
    .put(authMiddleware.authorize('admin'), RemoqueController.updateRemoque) 
    .delete(authMiddleware.authorize('admin'), RemoqueController.deleteRemoque);

export default remoqueRoutes;