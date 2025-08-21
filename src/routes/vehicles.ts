import express, { Request, Response, NextFunction, Router } from 'express';

const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ status: 'OK', route: `/vehicles/${id}` });
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id/doors', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ status: 'OK', route: `/vehicles/${id}/doors` });
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id/fuel', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ status: 'OK', route: `/vehicles/${id}/fuel` });
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id/battery', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ status: 'OK', route: `/vehicles/${id}/battery` });
  } catch (error) {
    console.error(error);
  }
});

router.post('/:id/engine', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ status: 'OK', route: `/vehicles/${id}/engine` });
  } catch (error) {
    console.error(error);
  }
});

export default router;