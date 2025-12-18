import express from 'express';

import RemoqueController from '../controllers/RemoqueController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const remoqueRouter = express.Router();

remoqueRouter.use(authMiddleware.protect);

remoqueRouter.route('/remoque')
    .get(RemoqueController.getAllRemoques)
    .post(authMiddleware.authorize('admin'), RemoqueController.createRemoque);

remoqueRouter.route('/remoque/:id')
    .put(authMiddleware.authorize('admin'), RemoqueController.updateRemoque) 
    .delete(authMiddleware.authorize('admin'), RemoqueController.deleteRemoque);

export default remoqueRouter;