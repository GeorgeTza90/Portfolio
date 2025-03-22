import axios from "axios";

class GetService {
  constructor() {
    this.api = axios.create({
      baseURL: "/api",
    });
  }

  async getHomeData(authToken) {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    return this.fetchData("/", headers);
  }

  async getProfileData(authToken) {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    return this.fetchData("/profile", headers);
  }

  async getPlayerData(authToken) {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    return this.fetchData("/player", headers);
  }

  async getUploaderData(authToken) {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    return this.fetchData("/player/upload", headers);
  }

  async getStoreData(authToken) {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    return this.fetchData("/store", headers);
  }

  async getAboutData() {
    return this.fetchData("/about");
  }

  async getRegisterData() {
    return this.fetchData("/register");
  }

  async getLoginData() {
      return this.fetchData("/login");  
  }

  async fetchData(endpoint, headers = {}) {
    try {
      const response = await this.api.get(endpoint, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }
}

export default new GetService();
