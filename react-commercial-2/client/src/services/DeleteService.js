import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'https://grandeplayer.up.railway.app';


class DeleteService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/api`,
      withCredentials: true,
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
