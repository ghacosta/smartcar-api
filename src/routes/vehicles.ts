import express, { Request, Response, NextFunction, Router } from 'express';
import mmApiClient from '../services/mmApiClient';
import {
  transformVehicleInfo,
  transformSecurityStatus,
  transformFuelLevel,
  transformBatteryLevel,
  transformEngineAction,
} from '../utils/transformers';
import logger from '../config/logger';

const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Getting vehicle info', { vehicleId: id });

    const mmResponse = await mmApiClient.getVehicleInfo(id);
    const transformedData = transformVehicleInfo(mmResponse);
    res.json(transformedData);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/doors', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Getting vehicle doors', { vehicleId: id });

    const mmResponse = await mmApiClient.getSecurityStatus(id);
    const transformedData = transformSecurityStatus(mmResponse);
    res.json(transformedData);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/fuel', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Getting vehicle fuel level', { vehicleId: id });

    const mmResponse = await mmApiClient.getEnergyLevel(id);
    const transformedData = transformFuelLevel(mmResponse);
    res.json(transformedData);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/battery', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Getting vehicle battery level', { vehicleId: id });

    const mmResponse = await mmApiClient.getEnergyLevel(id);
    const transformedData = transformBatteryLevel(mmResponse);
    res.json(transformedData);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/engine', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    logger.info('Engine action', { vehicleId: id, action });

    const command = action === 'START' ? 'START_VEHICLE' : 'STOP_VEHICLE';
    const mmResponse = await mmApiClient.actionEngine(id, command);
    const transformedData = transformEngineAction(mmResponse);
    res.json(transformedData);
  } catch (error) {
    next(error);
  }
});

export default router;