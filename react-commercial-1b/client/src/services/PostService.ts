import axios, { AxiosHeaders } from "axios";
import type { AxiosInstance } from "axios";
import type { PurchaseData } from "../types/types.ts";

const API_URL = import.meta.env.VITE_API_URL || 'https://icvacations.up.railway.app';

class PostService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/api`,
      withCredentials: true,
    });
  }

  async postLikeData(kind: string, id: string | number, user: string): Promise<any> {
    const data = { kind, kindID: id, user };
    const err = `Cannot like/unlike this ${kind}`;
    return this.postData("/like", { data }, err);
  }

  async postCommentData(user: string, text: string, postID: string | number): Promise<any> {
    const data = { username: user, text, kind: "post", kindID: postID };
    const err = "Failed to submit comment:";
    return this.postData("/comment", { data }, err);
  }

  async postContactData(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    topic: string,
    message: string
  ): Promise<any> {
    const data = { firstName, lastName, email, phoneNumber, topic, message };
    const err = "Error in Contact Form:";
    return this.postData("/contact", { data, withCredentials: true }, err);
  }

  async postLoginData(email: string, password: string): Promise<any> {
    const data = { email, password };
    const err = "Failed to login:";
    return this.postData("/login", { data, withCredentials: true }, err);
  }

  async postLogoutData(token: string): Promise<any> {
    // Use AxiosHeaders instance to avoid TS error
    const headers = new AxiosHeaders({ Authorization: `Bearer ${token}` });
    const err = "Failed to logout:";
    return this.postData("/logout", { headers }, err);
  }

  async postRegisterData(user: string, pwd: string, email: string): Promise<any> {
    const data = { user, pwd, email };
    const err = "Failed to register:";
    return this.postData("/register", { data, withCredentials: true }, err);
  }

  async postPurchaseData(data: PurchaseData): Promise<any> {
    const err = "Failed on purchase:";
    return this.postData("/purchase", { data, withCredentials: true }, err);
  }

  private async postData(
    endpoint: string,
    options: { data?: object; headers?: AxiosHeaders; withCredentials?: boolean },
    errMsg: string
  ): Promise<any> {
    try {
      const { data, headers, withCredentials } = options;
      const response = await this.api.post(endpoint, data, {
        headers: headers ?? new AxiosHeaders({ "Content-Type": "application/json" }),
        withCredentials: withCredentials ?? false,
      });
      return response.data;
    } catch (error: any) {
      console.error(`${errMsg}`, error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

export default new PostService();
