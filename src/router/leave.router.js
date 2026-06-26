import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { applyLeave, getMyLeaves, getPendingLeaves, hrActionOnLeave } from '../controllers/leave.controller.js';

let leaveRouter = Router();

leaveRouter.post("/apply", authenticate, authorize("Employee"),  applyLeave);
leaveRouter.get( "/my-leaves", authenticate, authorize("Employee"), getMyLeaves);

leaveRouter.get( "/hr/pending", authenticate, authorize("HR"), getPendingLeaves);
leaveRouter.put( "/hr/:leaveId", authenticate, authorize("HR"), hrActionOnLeave);

export default leaveRouter;