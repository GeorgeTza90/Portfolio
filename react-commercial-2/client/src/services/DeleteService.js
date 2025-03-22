import axios from "axios";

class DeleteService {
  constructor() {
    this.api = axios.create({
      baseURL: "/api",  
    });
  }

  async deleteSongData(song) {
      const data = { song };
      const headers = { "Content-Type": "application/json" }
      return this.deleteData("/player/deleteSong", {data , headers})
  }

  async deleteData(endpoint, data, headers = {}) {
    try {
      const response = await this.api.delete(endpoint, { data, headers });
      return response.data;
    } catch (error) {
      console.error(`Error deleting data from ${endpoint}:`, error);
      throw error;
    }
  }

}

export default new DeleteService();
