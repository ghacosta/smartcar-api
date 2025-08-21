const request = require('supertest');
const app = require('../../dist/app').default;

describe('Vehicles API', () => {
  describe('GET /vehicles/:id', () => {
    it('should return vehicle info for valid ID', async () => {
      const response = await request(app)
        .get('/vehicles/1234')
        .expect(200);

      expect(response.body).toHaveProperty('vin');
      expect(response.body).toHaveProperty('color');
      expect(response.body).toHaveProperty('doorCount');
      expect(response.body).toHaveProperty('driveTrain');
    });

    it('should return 404 for invalid vehicle ID', async () => {
      const response = await request(app)
        .get('/vehicles/9999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
      expect(response.body).toHaveProperty('message', 'Vehicle not found');
    });
  });

  describe('GET /vehicles/:id/doors', () => {
    it('should return door status for valid ID', async () => {
      const response = await request(app)
        .get('/vehicles/1234/doors')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('location');
      expect(response.body[0]).toHaveProperty('locked');
    });

    it('should return 404 for invalid vehicle ID', async () => {
      await request(app)
        .get('/vehicles/9999/doors')
        .expect(404);
    });
  });

  describe('GET /vehicles/:id/fuel', () => {
    it('should return fuel level for gas vehicle', async () => {
      const response = await request(app)
        .get('/vehicles/1234/fuel')
        .expect(200);

      expect(response.body).toHaveProperty('percent');
      expect(typeof response.body.percent).toBe('number');
    });

    it('should return 404 for electric vehicle', async () => {
      const response = await request(app)
        .get('/vehicles/1235/fuel')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /vehicles/:id/battery', () => {
    it('should return battery level for electric vehicle', async () => {
      const response = await request(app)
        .get('/vehicles/1235/battery')
        .expect(200);

      expect(response.body).toHaveProperty('percent');
      expect(typeof response.body.percent).toBe('number');
    });

    it('should return 404 for gas vehicle', async () => {
      const response = await request(app)
        .get('/vehicles/1234/battery')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /vehicles/:id/engine', () => {
    it('should start engine successfully', async () => {
      const response = await request(app)
        .post('/vehicles/1234/engine')
        .send({ action: 'START' })
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(['success', 'error']).toContain(response.body.status);
    });

    it('should stop engine successfully', async () => {
      const response = await request(app)
        .post('/vehicles/1234/engine')
        .send({ action: 'STOP' })
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(['success', 'error']).toContain(response.body.status);
    });

    it('should return 400 for invalid action', async () => {
      const response = await request(app)
        .post('/vehicles/1234/engine')
        .send({ action: 'INVALID' })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', 'Action must be START or STOP');
    });

    it('should return 400 for missing action', async () => {
      const response = await request(app)
        .post('/vehicles/1234/engine')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', 'Action is required');
    });

    it('should return 404 for invalid vehicle ID', async () => {
      await request(app)
        .post('/vehicles/9999/engine')
        .send({ action: 'START' })
        .expect(404);
    });
  });

  describe('Welcome endpoint', () => {
    it('should return OK status', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
      expect(response.body).toHaveProperty('message', 'Route not found');
    });
  });
});