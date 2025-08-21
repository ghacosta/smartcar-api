import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import logger from '../config/logger';
import {
  MMApiRequest,
  MMVehicleInfoResponse,
  MMSecurityResponse,
  MMEnergyResponse,
  MMEngineActionResponse,
} from '../types/api';

class MMApiClient {
  private baseURL: string;
  private client: AxiosInstance;

  constructor() {
    this.baseURL = 'https://platform-challenge.smartcar.com';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        logger.info('MM API Request', {
          method: config.method,
          url: config.url,
          data: config.data,
        });
        return config;
      },
      (error) => {
        logger.error('MM API Request Error', error);
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.info('MM API Response', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
        return response;
      },
      (error) => {
        logger.error('MM API Response Error', {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url,
        });
        return Promise.reject(error);
      },
    );
  }

  async getVehicleInfo(vehicleId: string): Promise<MMVehicleInfoResponse> {
    try {
      const requestData: MMApiRequest = {
        id: vehicleId,
        responseType: 'JSON',
      };

      const response = await this.client.post<MMVehicleInfoResponse>('/v1/getVehicleInfoService', requestData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get vehicle info: ${(error as Error).message}`);
    }
  }

  async getSecurityStatus(vehicleId: string): Promise<MMSecurityResponse> {
    try {
      const requestData: MMApiRequest = {
        id: vehicleId,
        responseType: 'JSON',
      };
      
      const response = await this.client.post<MMSecurityResponse>('/v1/getSecurityStatusService', requestData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get security status: ${(error as Error).message}`);
    }
  }

  async getEnergyLevel(vehicleId: string): Promise<MMEnergyResponse> {
    try {
      const requestData: MMApiRequest = {
        id: vehicleId,
        responseType: 'JSON',
      };
      
      const response = await this.client.post<MMEnergyResponse>('/v1/getEnergyService', requestData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get energy level: ${(error as Error).message}`);
    }
  }

  async actionEngine(vehicleId: string, command: string): Promise<MMEngineActionResponse> {
    try {
      const requestData: MMApiRequest = {
        id: vehicleId,
        command,
        responseType: 'JSON',
      };
      
      const response = await this.client.post<MMEngineActionResponse>('/v1/actionEngineService', requestData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to execute engine action: ${(error as Error).message}`);
    }
  }
}

export default new MMApiClient();