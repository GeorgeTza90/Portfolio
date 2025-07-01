import axios, { AxiosHeaders } from "axios";
import type { AxiosInstance, AxiosRequestHeaders } from "axios";
import type { DeleteLikeDataParams } from "../types/types.ts";

const API_URL = import.meta.env.VITE_API_URL || 'https://icvacations.up.railway.app';

class DeleteService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/api`,
      withCredentials: true,
    });
  }

  async deleteLikeData(kind: string, id: string | number, user: string): Promise<any> {
    const data: DeleteLikeDataParams = { kind, id, user };
    const headers: AxiosRequestHeaders = new AxiosHeaders({ "Content-Type": "application/json" });
    const err = `Cannot like/unlike this ${kind}`;
    return this.deleteData("/like", { data, headers }, err);
  }

  async deleteCommentData(commentID: string | number, user: string): Promise<any> {
    const data = { user };
    const headers: AxiosRequestHeaders = new AxiosHeaders({ "Content-Type": "application/json" });
    const err = "Error deleting comment:";
    return this.deleteData(`/comment/${commentID}`, { data, headers }, err);
  }

  private async deleteData(
    endpoint: string,
    options: { data: object; headers: AxiosRequestHeaders },
    errMsg: string
  ): Promise<any> {
    try {
      const response = await this.api.delete(endpoint, options);
      return response.data;
    } catch (error: any) {
      console.error(`${errMsg}`, error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

export default new DeleteService();
