import express, { Request, Response, NextFunction, Router } from 'express';
import mmApiClient from '../services/mmApiClient';
import {
  transformVehicleInfo,
  // transformSecurityStatus,
  // transformFuelLevel,
  // transformBatteryLevel,
  // transformEngineAction,
} from '../utils/transformers';

const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const mmResponse = await mmApiClient.getVehicleInfo(id);
    const transformedData = transformVehicleInfo(mmResponse);
    res.json(transformedData);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id/doors', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
  
    const mmResponse = await mmApiClient.getSecurityStatus(id);
    // TODO: here should call a transform function to format response
    res.json(mmResponse);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id/fuel', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const mmResponse = await mmApiClient.getEnergyLevel(id);
    // TODO: here should call a transform function to format response
    res.json(mmResponse);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id/battery', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const mmResponse = await mmApiClient.getEnergyLevel(id);
    // TODO: here should call a transform function to format response
    res.json(mmResponse);
  } catch (error) {
    console.error(error);
  }
});

router.post('/:id/engine', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const command = action === 'START' ? 'START_VEHICLE' : 'STOP_VEHICLE';
    const mmResponse = await mmApiClient.actionEngine(id, command);
    // TODO: here should call a transform function to format response
    res.json(mmResponse);
  } catch (error) {
    console.error(error);
  }
});

export default router;