import axios, { AxiosInstance } from "axios";
import { ObservableValue } from "../types/types";

export type CreateApiClientArgs = {
  endpoint: string;
  fetchAccessToken: () => Promise<string>;
  handleAlertUnexpectedError?: ObservableValue<boolean>;
};

export const createApiClient = (args: CreateApiClientArgs): AxiosInstance => {
  const { endpoint, fetchAccessToken, handleAlertUnexpectedError } = args;

  const api = axios.create({
    baseURL: endpoint,
  });

  api.interceptors.request.use(async (config) => {
    const accessToken = await fetchAccessToken();

    config.headers!.Authorization = `Bearer ${accessToken}`;

    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (!!handleAlertUnexpectedError && error.response?.status === 500) {
        handleAlertUnexpectedError.set(true);
      }
      throw error;
    }
  );

  return api;
};
