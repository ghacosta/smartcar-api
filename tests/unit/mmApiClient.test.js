describe('mmApiClient', () => {
  describe('Configuration', () => {
    it('should exist and export required methods', () => {
      const mmApiClient = require('../../dist/services/mmApiClient').default;

      expect(typeof mmApiClient.getVehicleInfo).toBe('function');
      expect(typeof mmApiClient.getSecurityStatus).toBe('function');
      expect(typeof mmApiClient.getEnergyLevel).toBe('function');
      expect(typeof mmApiClient.actionEngine).toBe('function');
    });
  });
});
