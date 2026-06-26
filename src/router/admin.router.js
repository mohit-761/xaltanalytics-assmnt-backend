import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { adminActionOnLeave, getHrApprovedLeaves } from '../controllers/admin.controller.js';

let adminRouter = Router();

adminRouter.get("/approved", authenticate, authorize("Admin"), getHrApprovedLeaves);
adminRouter.put( "/:leaveId",  authenticate,  authorize("Admin"),  adminActionOnLeave );

export default adminRouter;