import axios, { AxiosHeaders } from "axios";
import type { AxiosInstance, AxiosRequestHeaders } from "axios";
import type { NewsData, DestinationData } from "../types/types.ts";

const API_URL = import.meta.env.VITE_API_URL;

class GetService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/api`,
      withCredentials: true,
    });
  }

  async getNewsData(authToken?: string): Promise<NewsData> {
    const headers: AxiosRequestHeaders | undefined = authToken
      ? new AxiosHeaders({ Authorization: `Bearer ${authToken}` })
      : undefined;

    const err = "Error fetching news data:";
    return this.getData<NewsData>("/news", { headers }, err);
  }

  async getDestinationData(): Promise<DestinationData> {
    const err = "Error fetching destination data:";
    return this.getData<DestinationData>("/destination", {}, err);
  }

  async getContactData(authToken?: string): Promise<any> { // define proper type when you know the shape
    const headers: AxiosRequestHeaders | undefined = authToken
      ? new AxiosHeaders({ Authorization: `Bearer ${authToken}` })
      : undefined;

    const err = "Error fetching contact data:";
    return this.getData<any>("/contact", { headers }, err);
  }

  private async getData<T>(
    endpoint: string,
    options: { headers?: AxiosRequestHeaders },
    errMsg: string
  ): Promise<T> {
    try {
      const response = await this.api.get<T>(endpoint, options);
      return response.data;
    } catch (error) {
      console.error(errMsg, error);
      throw error;
    }
  }
}

export default new GetService();
