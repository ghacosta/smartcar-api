import {
  MMField,
  MMVehicleInfoResponse,
  MMSecurityResponse,
  SmartcarVehicleInfo,
  SmartcarDoor,
} from "../types/api";

function extractValue<T>(field: MMField<T> | undefined | null): T | null {
  if (!field || typeof field !== "object" || field.value === undefined) {
    return null;
  }

  const { type, value } = field;

  switch (type) {
    case "String":
      return value;
    case "Number":
      return typeof value === "string" ? (parseFloat(value) as T) : value;
    case "Boolean":
      return (value === "True" || value === "true" || value === true) as T;
    case "Null":
      return null;
    default:
      return value;
  }
}

function transformVehicleInfo(
  mmResponse: MMVehicleInfoResponse
): SmartcarVehicleInfo {
  try {
    if (!mmResponse || !mmResponse.data) {
      throw new Error("Invalid MM API response format");
    }

    const { data } = mmResponse;

    let doorCount: number | null = null;
    if (extractValue(data.fourDoorSedan)) {
      doorCount = 4;
    } else if (extractValue(data.twoDoorCoupe)) {
      doorCount = 2;
    }

    return {
      vin: extractValue(data.vin),
      color: extractValue(data.color),
      doorCount,
      driveTrain: extractValue(data.driveTrain),
    };
  } catch (error) {
    throw error;
  }
}

function transformSecurityStatus(
  mmResponse: MMSecurityResponse
): SmartcarDoor[] {
  try {
    if (!mmResponse || !mmResponse.data || !mmResponse.data.doors
      || !mmResponse.data.doors.values) {
      throw new Error('Invalid MM API security response format');
    }

    return mmResponse.data.doors.values.map((door): SmartcarDoor => ({
      location: extractValue(door.location),
      locked: extractValue(door.locked),
    }));
  } catch (error) {
    throw error;
  }
}

export {
  transformVehicleInfo,
  transformSecurityStatus,
  // transformFuelLevel,
  // transformBatteryLevel,
  // transformEngineAction,
};
