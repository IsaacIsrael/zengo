/* eslint-disable class-methods-use-this */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Logger from '../helper/Logger';
import timeout from '../helper/timeout';

const TIMEOUT_SEC = 5;

class HTTPService {
  private logRequest = (request: AxiosRequestConfig): void => {
    Logger.info(
      `HTTP: executing request: ${request.method?.toLocaleUpperCase()} ${request.baseURL}${request.url}`,
      request.data,
    );
  };

  private logResponse = (response: AxiosResponse): void => {
    Logger.success(
      `HTTP: response acquired for url: [${response.status}] ${response.config.baseURL}${response.config.url}`,
      response.data,
    );
  };

  constructor() {
    axios.defaults.timeout = TIMEOUT_SEC * 1000;
    axios.defaults.baseURL = '';

    axios.interceptors.request.use((request) => {
      this.logRequest(request);
      return request;
    });

    axios.interceptors.response.use((response) => {
      this.logResponse(response);
      return response;
    });
  }

  async get<T = any>(url: string): Promise<AxiosResponse<T>> {
    const controller = new AbortController();
    return timeout(
      TIMEOUT_SEC,
      axios.get<T>(url, {
        signal: controller.signal,
      }),
      () => {
        controller.abort();
      },
    );
  }

  async put<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const controller = new AbortController();

    return timeout(
      TIMEOUT_SEC,
      axios.put<T>(url, data, {
        signal: controller.signal,
      }),
      () => {
        controller.abort();
      },
    );
  }

  async post<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const controller = new AbortController();

    return timeout(
      TIMEOUT_SEC,
      axios.post<T>(url, data, {
        signal: controller.signal,
      }),
      () => {
        controller.abort();
      },
    );
  }
}

const httpServices = new HTTPService();
export default httpServices;
