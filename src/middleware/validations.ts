import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

interface ErrorResponse {
  error: string;
  message: string;
}

interface EngineActionRequest extends Request {
  body: {
    action: string;
  };
}


const VALID_VEHICLE_IDS = ['1234', '1235'] as const;
const VALID_ENGINE_ACTIONS = ['START', 'STOP'] as const;

type ValidVehicleId = typeof VALID_VEHICLE_IDS[number];
type ValidEngineAction = typeof VALID_ENGINE_ACTIONS[number];

function validateVehicleId(req: Request, res: Response, next: NextFunction): Response<ErrorResponse> | void {
  const { id } = req.params;

  if (!id) {
    logger.warn('Missing vehicle ID', { url: req.url });
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Vehicle ID is required',
    });
  }

  if (!VALID_VEHICLE_IDS.includes(id as ValidVehicleId)) {
    logger.warn('Invalid vehicle ID', { id, url: req.url });
    return res.status(404).json({
      error: 'Not Found',
      message: 'Vehicle not found',
    });
  }

  next();
}

function validateEngineAction(req: EngineActionRequest, res: Response, next: NextFunction): Response<ErrorResponse> | void {
  const { action } = req.body;

  if (!action) {
    logger.warn('Missing engine action', { body: req.body });
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Action is required',
    });
  }

  if (!VALID_ENGINE_ACTIONS.includes(action as ValidEngineAction)) {
    logger.warn('Invalid engine action', { action });
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Action must be START or STOP',
    });
  }

  next();
}

export {
  validateVehicleId,
  validateEngineAction
};