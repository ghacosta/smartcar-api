export interface MMField<T = any> {
  type: 'String' | 'Number' | 'Boolean' | 'Null';
  value: T;
}

export interface MMVehicleInfoResponse {
  data: {
    vin: MMField<string>;
    color: MMField<string>;
    fourDoorSedan: MMField<boolean>;
    twoDoorCoupe: MMField<boolean>;
    driveTrain: MMField<string>;
  };
}

export interface MMSecurityResponse {
  data: {
    doors: {
      values: Array<{
        location: MMField<string>;
        locked: MMField<boolean>;
      }>;
    };
  };
}

export interface MMEnergyResponse {
  data: {
    tankLevel?: MMField<number>;
    batteryLevel?: MMField<number>;
  };
}

export interface MMEngineActionResponse {
  actionResult: {
    status: 'EXECUTED' | 'FAILED';
  };
}

export type MMApiRequest = {
  id: string;
  responseType: 'JSON';
  command?: string;
};

// Smartcar specs types below
export interface SmartcarVehicleInfo {
  vin: string | null;
  color: string | null;
  doorCount: number | null;
  driveTrain: string | null;
}