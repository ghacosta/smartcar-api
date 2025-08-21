# Smartcar API Challenge

This is a challenge for smartcar project, this is a NodeJS API which adapts a third party API (Madeup Motors) into a RESTful API following smartcar specifications.

## Objective

Map following routes:

- GET /vehicles/:id -> POST /v1/getVehicleInfoService
- GET /vehicles/:id/doors -> POST /v1/getSecurityStatus
- GET /vehicles/:id/fuel -> POST /v1/getEnergyService
- GET /vehicles/:id/battery -> POST /v1/getEnergyService
- POST /vehicles/:id/engine -> POST /v1/actionEngineService


## Main Steps 

- Scaffolding: Create package json, config files, add typescript support, and initial route to check everything it's working.
- Create routes described on the previous point
- request to the corresponding endpoint in MM API and transform data.
- Work on logging.
- Create tests.

## API Endpoints

### Vehicle Information
```
GET /vehicles/:id
```
Returns basic vehicle information including VIN, color, door count, and drivetrain.

**Response:**
```json
{
  "vin": "123123412412",
  "color": "Metallic Silver",
  "doorCount": 4,
  "driveTrain": "v8"
}
```

### Door Status
```
GET /vehicles/:id/doors
```
Returns the lock status of all vehicle doors.

**Response:**
```json
[
  {
    "location": "frontLeft",
    "locked": true
  },
  {
    "location": "frontRight",
    "locked": false
  }
]
```

### Fuel Level
```
GET /vehicles/:id/fuel
```
Returns the fuel level percentage for gas vehicles.

**Response:**
```json
{
  "percent": 30.2
}
```

### Battery Level
```
GET /vehicles/:id/battery
```
Returns the battery level percentage for electric vehicles.

**Response:**
```json
{
  "percent": 50.3
}
```

### Engine Control
```
POST /vehicles/:id/engine
Content-Type: application/json

{
  "action": "START"
}
```
Starts or stops the vehicle engine. Action can be "START" or "STOP".

**Response:**
```json
{
  "status": "success"
}
```

### Health Check
```
GET /
```
Returns API health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-12-01T10:00:00.000Z"
}
```

## Available Vehicle IDs

- `1234` - Gas vehicle
- `1235` - Electric vehicle

This project implements validations to ensure these ids are being used, if trying another id such as `1299` or anything else it will return status code `404` with message `Vehicle not found`.
