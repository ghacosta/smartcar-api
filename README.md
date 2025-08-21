# Smartcar API Challenge

This is a challenge for smartcar project, this is a NodeJS API which adapts a third party API (Madeup Motors) into a RESTful API following smartcar specifications.

# Objective

Map following routes:

- GET /vehicles/:id -> POST /v1/getVehicleInfoService
- GET /vehicles/:id/doors -> POST /v1/getSecurityStatus
- GET /vehicles/:id/fuel -> POST /v1/getEnergyService
- GET /vehicles/:id/battery -> POST /v1/getEnergyService
- POST /vehicles/:id/engine -> POST /v1/actionEngineService


# Main Steps 

- Scaffolding: Create package json, config files, add typescript support, and initial route to check everything it's working.
- Create routes described on the previous point
- request to the corresponding endpoint in MM API and transform data.
- Work on logging.
- Create tests.