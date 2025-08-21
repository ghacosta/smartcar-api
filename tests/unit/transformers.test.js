const {
  transformVehicleInfo,
  transformSecurityStatus,
  transformFuelLevel,
  transformBatteryLevel,
  transformEngineAction,
} = require('../../dist/utils/transformers');

describe('Transformers', () => {
  describe('transformVehicleInfo', () => {
    it('should transform vehicle info correctly', () => {
      const mmResponse = {
        data: {
          vin: { type: 'String', value: '123123412412' },
          color: { type: 'String', value: 'Metallic Silver' },
          fourDoorSedan: { type: 'Boolean', value: 'True' },
          twoDoorCoupe: { type: 'Boolean', value: 'False' },
          driveTrain: { type: 'String', value: 'v8' },
        },
      };

      const result = transformVehicleInfo(mmResponse);

      expect(result).toEqual({
        vin: '123123412412',
        color: 'Metallic Silver',
        doorCount: 4,
        driveTrain: 'v8',
      });
    });

    it('should handle two door vehicle', () => {
      const mmResponse = {
        data: {
          vin: { type: 'String', value: '123123412412' },
          color: { type: 'String', value: 'Red' },
          fourDoorSedan: { type: 'Boolean', value: 'False' },
          twoDoorCoupe: { type: 'Boolean', value: 'True' },
          driveTrain: { type: 'String', value: 'v6' },
        },
      };

      const result = transformVehicleInfo(mmResponse);

      expect(result.doorCount).toBe(2);
    });

    it('should throw error for invalid response', () => {
      expect(() => transformVehicleInfo(null)).toThrow('Invalid MM API response format');
    });
  });

  describe('transformSecurityStatus', () => {
    it('should transform security status correctly', () => {
      const mmResponse = {
        data: {
          doors: {
            values: [
              {
                location: { type: 'String', value: 'frontLeft' },
                locked: { type: 'Boolean', value: 'False' },
              },
              {
                location: { type: 'String', value: 'frontRight' },
                locked: { type: 'Boolean', value: 'True' },
              },
            ],
          },
        },
      };

      const result = transformSecurityStatus(mmResponse);

      expect(result).toEqual([
        { location: 'frontLeft', locked: false },
        { location: 'frontRight', locked: true },
      ]);
    });

    it('should throw error for invalid response', () => {
      expect(() => transformSecurityStatus(null)).toThrow('Invalid MM API security response format');
    });
  });

  describe('transformFuelLevel', () => {
    it('should transform fuel level correctly', () => {
      const mmResponse = {
        data: {
          tankLevel: { type: 'Number', value: '30.2' },
          batteryLevel: { type: 'Null', value: 'null' },
        },
      };

      const result = transformFuelLevel(mmResponse);

      expect(result).toEqual({ percent: 30.2 });
    });

    it('should throw error when vehicle has no fuel tank', () => {
      const mmResponse = {
        data: {
          tankLevel: { type: 'Null', value: 'null' },
          batteryLevel: { type: 'Number', value: '50.3' },
        },
      };

      expect(() => transformFuelLevel(mmResponse)).toThrow('Vehicle does not have fuel tank');
    });
  });

  describe('transformBatteryLevel', () => {
    it('should transform battery level correctly', () => {
      const mmResponse = {
        data: {
          tankLevel: { type: 'Null', value: 'null' },
          batteryLevel: { type: 'Number', value: '50.3' },
        },
      };

      const result = transformBatteryLevel(mmResponse);

      expect(result).toEqual({ percent: 50.3 });
    });

    it('should throw error when vehicle has no battery', () => {
      const mmResponse = {
        data: {
          tankLevel: { type: 'Number', value: '30.2' },
          batteryLevel: { type: 'Null', value: 'null' },
        },
      };

      expect(() => transformBatteryLevel(mmResponse)).toThrow('Vehicle does not have battery');
    });
  });

  describe('transformEngineAction', () => {
    it('should transform successful engine action', () => {
      const mmResponse = {
        actionResult: {
          status: 'EXECUTED',
        },
      };

      const result = transformEngineAction(mmResponse);

      expect(result).toEqual({ status: 'success' });
    });

    it('should transform failed engine action', () => {
      const mmResponse = {
        actionResult: {
          status: 'FAILED',
        },
      };

      const result = transformEngineAction(mmResponse);

      expect(result).toEqual({ status: 'error' });
    });

    it('should throw error for invalid response', () => {
      expect(() => transformEngineAction(null)).toThrow('Invalid MM API engine action response format');
    });
  });
});
